# Generated by Django 4.2.16 on 2025-03-31 08:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bytes', models.TextField()),
                ('filename', models.CharField(max_length=255)),
                ('mimetype', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('image', models.ImageField(help_text='Please compress image and convert type to webp before uploading. \n                              https://imagecompressor.com, \n                              https://cloudconvert.com/webp-converter', null=True, upload_to='website.File/bytes/filename/mimetype')),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Name of Club/Program', max_length=100, unique=True)),
                ('link_url', models.URLField(blank=True, help_text='Enter full link to the club/program website')),
                ('link_name', models.CharField(blank=True, help_text='Short label for the URL, e.g "Visit Site"', max_length=100)),
                ('image', models.ForeignKey(help_text='Club Logo', null=True, on_delete=django.db.models.deletion.SET_NULL, to='website.image')),
            ],
        ),
    ]
