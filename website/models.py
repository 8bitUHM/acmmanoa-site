from django.db import models
from datetime import datetime

# Create your models here.
class File(models.Model): 
    bytes = models.TextField()
    filename = models.CharField(max_length=255)
    mimetype = models.CharField(max_length=50)

    def __str__(self): 
        return self.filename
    

class Sponsor(models.Model):
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    name = models.CharField(max_length=125, unique=True, help_text="Name of Sponsor (Organization and/or Individual)")
    website = models.URLField(verbose_name='Website Link', blank=True, help_text="Enter link to organization's website")
    # details = models.TextField(help_text="details of the sponsor", null=True, blank=True, default="")
    image = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        blank=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )

    def __str__(self): 
        return self.name
     
    def delete(self, *args, **kwargs): 
        super(Sponsor, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.image.name).delete()
    

class Program(models.Model):
    name = models.CharField(max_length=175, unique=True, help_text="Name of Club/Program")
    logo = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )
    slug = models.SlugField(default='', unique=True)
    about = models.TextField(help_text="Description or overview of program", blank=True)
    website = models.URLField(help_text="Enter full link to the club/program website", blank=True)
    link_name = models.CharField(max_length=150, help_text="Short label for the URL, e.g \"Visit Site\"", blank=True)

    
    def __str__(self): 
        return self.name
     
    def delete(self, *args, **kwargs): 
        super(Program, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.logo.name).delete()

class ProgramLeadership(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=90)
    logo = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        blank=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )

    class Meta:
        verbose_name_plural = "Program Leadership"

    def __str__(self): 
        return self.name
     
    def delete(self, *args, **kwargs): 
        super(ProgramLeadership, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.logo.name).delete()

class CarouselImage(models.Model):
    image = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )
    caption = models.CharField(max_length=255, blank=True, null=True, help_text="description or title of the image")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.caption if self.caption else f"Image {self.id}"

    def delete(self, *args, **kwargs): 
        super(CarouselImage, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.image.name).delete()

class Event(models.Model):
    title = models.CharField(max_length=255, unique=True, help_text="name or headline of the event")
    image = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )
    description = models.TextField()
    event_date = models.DateTimeField(help_text="It is in 24-hour format")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.title

    def delete(self, *args, **kwargs):
        super(Event, self).delete(*args, **kwargs)
        File.objects.filter(filename = self.image.name).delete()

class ACMKekuhaupioCohort(models.Model):
    name = models.CharField(max_length=200)
    semester = models.CharField(max_length=20, help_text="Please enter sememster that they participated in. E.g Fall 2024")
    accomplishments = models.TextField(help_text="Summary of what they achieved in the program")
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    comments = models.TextField(blank=True, help_text="Reflections or notes goes here")
    image = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        ''',
        blank=True
    )

    def __str__(self): 
        return self.name

    def delete(self, *args, **kwargs):
        super(ACMKekuhaupioCohort, self).delete(*args, **kwargs)
        File.objects.filter(filename = self.image.name).delete()
    
    class Meta: 
        verbose_name = "ACM Kekuhaupio Cohort"

class Leadership(models.Model):
    TITLE_CHOICES = [
        ('1', 'President'),
        ('2', 'Vice President'),
        ('3', 'Director of Membership'),
        ('4', 'Operations Director'),
        ('5', 'Public Relations Director'),
        ('6', 'Finance Coordinator'),
        ('7', 'Operations Coordinator'),
        ('8', 'Marketing Manager'),
        ('9', 'Server Administrator & Webmaster'),
        ('10', 'Faculty Sponsor'),
    ]

    name = models.CharField(max_length=200)
    title = models.CharField(max_length=50, choices=TITLE_CHOICES)
    image = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        ''')
    bio = models.CharField(max_length=200, help_text="(optional) Enter a short biography or background description about faculty member.", null=True, blank=True)

    class Meta:
        verbose_name = "Leadership"
        verbose_name_plural = "Leadership"
    
    def __str__(self):
        return self.name

    def get_title_display_name(self):
        return dict(self.TITLE_CHOICES).get(self.title, self.title)
    
    def delete(self, *args, **kwargs):
        super(Leadership, self).delete(*args, **kwargs)
        File.objects.filter(filename = self.image.name).delete()

class FAQ(models.Model):
    question = models.CharField(max_length=100, unique=True, help_text="Question that is asked frequently")
    answer = models.TextField(help_text="The answer to the question")
    created_at = models.DateTimeField(editable=False, auto_now_add=True)

    class Meta: 
        verbose_name = "F.A.Q."
    
    def __str__(self): 
        return self.question