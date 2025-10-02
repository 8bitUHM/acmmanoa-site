from django.db import models
from datetime import datetime
from django.core.validators import MaxLengthValidator, RegexValidator

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
    details = models.TextField(help_text="Details of the sponsor (max 250 characters)", null=True, blank=True, default="", validators=[MaxLengthValidator(250)])
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
    

class SIGS(models.Model):
    name = models.CharField(max_length=175, unique=True, help_text="Name of SIG")
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
    about = models.TextField(help_text="Description or overview of SIG", blank=True)
    website = models.URLField(help_text="Enter full link to the SIG website", blank=True)
    link_name = models.CharField(max_length=150, help_text="Short label for the URL, e.g \"Visit Site\"", blank=True)
    primary_color = models.CharField(
        max_length=7, 
        default='#3B82F6', 
        help_text="Primary color for this SIG (hex color code, e.g., #3B82F6 for blue)",
        validators=[RegexValidator(
            regex='^#[0-9A-Fa-f]{6}$',
            message='Enter a valid hex color code (e.g., #3B82F6)'
        )]
    )

    class Meta:
        verbose_name = "SIG"
        verbose_name_plural = "SIGS"
    
    def __str__(self): 
        return self.name
    
    def get_secondary_color(self):
        """Generate a secondary color that complements the primary color"""
        # Convert hex to RGB
        hex_color = self.primary_color.lstrip('#')
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        
        # Create a darker/lighter version for gradients
        # Reduce brightness by 20% for secondary color
        r = max(0, int(r * 0.8))
        g = max(0, int(g * 0.8))
        b = max(0, int(b * 0.8))
        
        return f"#{r:02x}{g:02x}{b:02x}"
    
    def get_light_color(self):
        """Generate a light version of the primary color for backgrounds"""
        hex_color = self.primary_color.lstrip('#')
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        
        # Create a very light version (90% white + 10% color)
        r = min(255, int(255 * 0.9 + r * 0.1))
        g = min(255, int(255 * 0.9 + g * 0.1))
        b = min(255, int(255 * 0.9 + b * 0.1))
        
        return f"#{r:02x}{g:02x}{b:02x}"
     
    def delete(self, *args, **kwargs): 
        super(SIGS, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.logo.name).delete()

class SIGSLeadership(models.Model):
    sigs = models.ForeignKey(SIGS, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=90)
    profile = models.ImageField(
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
        verbose_name = "SIGS Leadership"
        verbose_name_plural = "SIGS Leadership"

    def __str__(self): 
        return self.name
     
    def delete(self, *args, **kwargs): 
        super(SIGSLeadership, self).delete(*args, **kwargs) 
        File.objects.filter(filename = self.profile.name).delete()

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
        ('3', 'Operations Director'),
        ('4', 'Finance Director'),
        ('5', 'Public Relations Director'),
        ('6', 'Webmaster'),
        ('7', 'Director of Membership'),
        ('8', 'Faculty Sponsor'),
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