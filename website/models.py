from django.db import models

# Create your models here.
class File(models.Model): 
    bytes = models.TextField()
    filename = models.CharField(max_length=255)
    mimetype = models.CharField(max_length=50)

    def __str__(self): 
        return self.filename
    

class Program(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Name of Club/Program")
    logo = models.ImageField(
        upload_to="website.File/bytes/filename/mimetype",
        null=True,
        help_text='''
        Please compress the image and convert type to webp before uploading.
        https://imagecompressor.com,
        https://cloudconvert.com/webp-converter
        '''
    )
    link_url = models.URLField(help_text="Enter full link to the club/program website", blank=True)
    link_name = models.CharField(max_length=100, help_text="Short label for the URL, e.g \"Visit Site\"", blank=True)

    
    def __str__(self): 
        return self.name
     
    def delete(self, *args, **kwargs): 
        super(Program, self).delete(*args, **kwargs) 
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