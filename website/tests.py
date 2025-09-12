from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from django.core.files import File as DjangoFile
from .models import (
    File,
    Sponsor,
    SIGS,
    CarouselImage,
    Event,
    ACMKekuhaupioCohort,
    Leadership,
    FAQ
)
from datetime import datetime, timedelta
import os

class FileModelTest(TestCase):
    def setUp(self):
        self.file = File.objects.create(
            bytes="test_bytes",
            filename="test.txt",
            mimetype="text/plain"
        )

    def test_file_creation(self):
        self.assertEqual(self.file.bytes, "test_bytes")
        self.assertEqual(self.file.filename, "test.txt")
        self.assertEqual(self.file.mimetype, "text/plain")
        self.assertEqual(str(self.file), "test.txt")

    def test_file_update(self):
        self.file.filename = "updated.txt"
        self.file.bytes = "updated_bytes"
        self.file.save()
        
        updated_file = File.objects.get(id=self.file.id)
        self.assertEqual(updated_file.filename, "updated.txt")
        self.assertEqual(updated_file.bytes, "updated_bytes")

    def test_file_deletion(self):
        file_id = self.file.id
        self.file.delete()
        with self.assertRaises(File.DoesNotExist):
            File.objects.get(id=file_id)

class SponsorModelTest(TestCase):
    def setUp(self):
        # Create a test image file
        self.image_content = SimpleUploadedFile(
            "test_sponsor.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.sponsor = Sponsor.objects.create(
            name="Test Sponsor",
            website="https://example.com",
            image=self.image_content
        )

    def test_sponsor_creation(self):
        self.assertEqual(self.sponsor.name, "Test Sponsor")
        self.assertEqual(self.sponsor.website, "https://example.com")
        self.assertTrue(isinstance(self.sponsor.created_at, datetime))
        self.assertEqual(str(self.sponsor), "Test Sponsor")
        self.assertTrue(self.sponsor.image.name.endswith('test_sponsor.webp'))

    def test_sponsor_update(self):
        self.sponsor.name = "Updated Sponsor"
        self.sponsor.website = "https://updated.com"
        self.sponsor.save()
        
        updated_sponsor = Sponsor.objects.get(id=self.sponsor.id)
        self.assertEqual(updated_sponsor.name, "Updated Sponsor")
        self.assertEqual(updated_sponsor.website, "https://updated.com")

    def test_sponsor_deletion(self):
        image_path = self.sponsor.image.name
        sponsor_id = self.sponsor.id
        self.sponsor.delete()
        
        # Check sponsor is deleted
        with self.assertRaises(Sponsor.DoesNotExist):
            Sponsor.objects.get(id=sponsor_id)
        
        # Check associated file is deleted
        self.assertEqual(File.objects.filter(filename=image_path).count(), 0)

class SIGSModelTest(TestCase):
    def setUp(self):
        self.image_content = SimpleUploadedFile(
            "test_sigs.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.sigs = SIGS.objects.create(
            name="Test SIG",
            website="https://example.com",
            link_name="Visit Test",
            logo=self.image_content
        )

    def test_sigs_creation(self):
        self.assertEqual(self.sigs.name, "Test SIG")
        self.assertEqual(self.sigs.website, "https://example.com")
        self.assertEqual(self.sigs.link_name, "Visit Test")
        self.assertEqual(str(self.sigs), "Test SIG")
        self.assertTrue(self.sigs.logo.name.endswith('test_sigs.webp'))

    def test_sigs_update(self):
        self.sigs.name = "Updated SIG"
        self.sigs.link_name = "Updated Link"
        self.sigs.save()
        
        updated_sigs = SIGS.objects.get(id=self.sigs.id)
        self.assertEqual(updated_sigs.name, "Updated SIG")
        self.assertEqual(updated_sigs.link_name, "Updated Link")

    def test_sigs_deletion(self):
        logo_path = self.sigs.logo.name
        sigs_id = self.sigs.id
        self.sigs.delete()
        
        with self.assertRaises(SIGS.DoesNotExist):
            SIGS.objects.get(id=sigs_id)
        self.assertEqual(File.objects.filter(filename=logo_path).count(), 0)

class CarouselImageModelTest(TestCase):
    def setUp(self):
        self.image_content = SimpleUploadedFile(
            "test_carousel.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.carousel = CarouselImage.objects.create(
            caption="Test Caption",
            image=self.image_content
        )

    def test_carousel_creation(self):
        self.assertEqual(self.carousel.caption, "Test Caption")
        self.assertTrue(isinstance(self.carousel.created_at, datetime))
        self.assertEqual(str(self.carousel), "Test Caption")
        self.assertTrue(self.carousel.image.name.endswith('test_carousel.webp'))

    def test_carousel_update(self):
        self.carousel.caption = "Updated Caption"
        self.carousel.save()
        
        updated_carousel = CarouselImage.objects.get(id=self.carousel.id)
        self.assertEqual(updated_carousel.caption, "Updated Caption")

    def test_carousel_deletion(self):
        image_path = self.carousel.image.name
        carousel_id = self.carousel.id
        self.carousel.delete()
        
        with self.assertRaises(CarouselImage.DoesNotExist):
            CarouselImage.objects.get(id=carousel_id)
        self.assertEqual(File.objects.filter(filename=image_path).count(), 0)

    def test_carousel_no_caption(self):
        carousel_no_caption = CarouselImage.objects.create()
        self.assertEqual(str(carousel_no_caption), f"Image {carousel_no_caption.id}")

class EventModelTest(TestCase):
    def setUp(self):
        self.event_date = timezone.now() + timedelta(days=1)
        self.image_content = SimpleUploadedFile(
            "test_event.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.event = Event.objects.create(
            title="Test Event",
            description="Test Description",
            event_date=self.event_date,
            image=self.image_content
        )

    def test_event_creation(self):
        self.assertEqual(self.event.title, "Test Event")
        self.assertEqual(self.event.description, "Test Description")
        self.assertEqual(self.event.event_date, self.event_date)
        self.assertTrue(isinstance(self.event.created_at, datetime))
        self.assertEqual(str(self.event), "Test Event")
        self.assertTrue(self.event.image.name.endswith('test_event.webp'))

    def test_event_update(self):
        new_date = timezone.now() + timedelta(days=2)
        self.event.title = "Updated Event"
        self.event.event_date = new_date
        self.event.save()
        
        updated_event = Event.objects.get(id=self.event.id)
        self.assertEqual(updated_event.title, "Updated Event")
        self.assertEqual(updated_event.event_date, new_date)

    def test_event_deletion(self):
        image_path = self.event.image.name
        event_id = self.event.id
        self.event.delete()
        
        with self.assertRaises(Event.DoesNotExist):
            Event.objects.get(id=event_id)
        self.assertEqual(File.objects.filter(filename=image_path).count(), 0)

class ACMKekuhaupioCohortModelTest(TestCase):
    def setUp(self):
        self.image_content = SimpleUploadedFile(
            "test_cohort.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.cohort = ACMKekuhaupioCohort.objects.create(
            name="Test Student",
            semester="Fall 2024",
            accomplishments="Test Accomplishments",
            comments="Test Comments",
            image=self.image_content
        )

    def test_cohort_creation(self):
        self.assertEqual(self.cohort.name, "Test Student")
        self.assertEqual(self.cohort.semester, "Fall 2024")
        self.assertEqual(self.cohort.accomplishments, "Test Accomplishments")
        self.assertEqual(self.cohort.comments, "Test Comments")
        self.assertTrue(isinstance(self.cohort.created_at, datetime))
        self.assertEqual(str(self.cohort), "Test Student")
        self.assertTrue(self.cohort.image.name.endswith('test_cohort.webp'))

    def test_cohort_update(self):
        self.cohort.name = "Updated Student"
        self.cohort.semester = "Spring 2025"
        self.cohort.save()
        
        updated_cohort = ACMKekuhaupioCohort.objects.get(id=self.cohort.id)
        self.assertEqual(updated_cohort.name, "Updated Student")
        self.assertEqual(updated_cohort.semester, "Spring 2025")

    def test_cohort_deletion(self):
        image_path = self.cohort.image.name
        cohort_id = self.cohort.id
        self.cohort.delete()
        
        with self.assertRaises(ACMKekuhaupioCohort.DoesNotExist):
            ACMKekuhaupioCohort.objects.get(id=cohort_id)
        self.assertEqual(File.objects.filter(filename=image_path).count(), 0)

class LeadershipModelTest(TestCase):
    def setUp(self):
        self.image_content = SimpleUploadedFile(
            "test_leader.webp",
            b"file_content",
            content_type="image/webp"
        )
        self.leader = Leadership.objects.create(
            name="Test Leader",
            title="1",  # President
            bio="Test Bio",
            image=self.image_content
        )

    def test_leadership_creation(self):
        self.assertEqual(self.leader.name, "Test Leader")
        self.assertEqual(self.leader.title, "1")
        self.assertEqual(self.leader.bio, "Test Bio")
        self.assertEqual(str(self.leader), "Test Leader")
        self.assertEqual(self.leader.get_title_display_name(), "President")
        self.assertTrue(self.leader.image.name.endswith('test_leader.webp'))

    def test_leadership_update(self):
        self.leader.name = "Updated Leader"
        self.leader.title = "2"  # Vice President
        self.leader.save()
        
        updated_leader = Leadership.objects.get(id=self.leader.id)
        self.assertEqual(updated_leader.name, "Updated Leader")
        self.assertEqual(updated_leader.title, "2")
        self.assertEqual(updated_leader.get_title_display_name(), "Vice President")

    def test_leadership_deletion(self):
        image_path = self.leader.image.name
        leader_id = self.leader.id
        self.leader.delete()
        
        with self.assertRaises(Leadership.DoesNotExist):
            Leadership.objects.get(id=leader_id)
        self.assertEqual(File.objects.filter(filename=image_path).count(), 0)

class FAQModelTest(TestCase):
    def setUp(self):
        self.faq = FAQ.objects.create(
            question="Test Question?",
            answer="Test Answer"
        )

    def test_faq_creation(self):
        self.assertEqual(self.faq.question, "Test Question?")
        self.assertEqual(self.faq.answer, "Test Answer")
        self.assertTrue(isinstance(self.faq.created_at, datetime))
        self.assertEqual(str(self.faq), "Test Question?")

    def test_faq_update(self):
        self.faq.question = "Updated Question?"
        self.faq.answer = "Updated Answer"
        self.faq.save()
        
        updated_faq = FAQ.objects.get(id=self.faq.id)
        self.assertEqual(updated_faq.question, "Updated Question?")
        self.assertEqual(updated_faq.answer, "Updated Answer")

    def test_faq_deletion(self):
        faq_id = self.faq.id
        self.faq.delete()
        
        with self.assertRaises(FAQ.DoesNotExist):
            FAQ.objects.get(id=faq_id)
