from django.db import models

# Create your models here.
class File(models.Model): 
    bytes = models.TextField()
    filename = models.CharField(max_length=255)
    mimetype = models.CharField(max_length=50)

    def __str__(self): 
        return self.filename
    
class Image(models.Model): 
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='website.File/bytes/filename/mimetype', 
                              null=True, help_text='''Please compress image and convert type to webp before uploading. 
                              https://imagecompressor.com, 
                              https://cloudconvert.com/webp-converter''')
    
    def __str__(self): 
        return self.name
    
    def delete(self, *args, **kwargs): 
        super(Image, self).delete(*args, **kwargs)
        File.objects.filter(filename=self.image.name).delete()


class Program(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Name of Club/Program")
    image = models.ForeignKey(Image, null=True, on_delete=models.SET_NULL, help_text="Club Logo")
    link_url = models.URLField(help_text="Enter full link to the club/program website", blank=True)
    link_name = models.CharField(max_length=100, help_text="Short label for the URL, e.g \"Visit Site\"", blank=True)
    
    def __str__(self): 
        return self.name