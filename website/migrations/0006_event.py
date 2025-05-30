# Generated by Django 4.2.20 on 2025-04-29 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_alter_carouselimage_created_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='name or headline of the event', max_length=255, unique=True)),
                ('image', models.ImageField(help_text='\n        Please compress the image and convert type to webp before uploading.\n        https://imagecompressor.com,\n        https://cloudconvert.com/webp-converter\n        ', null=True, upload_to='website.File/bytes/filename/mimetype')),
                ('description', models.TextField()),
                ('event_date', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
