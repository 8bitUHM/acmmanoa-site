import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [('website', '0043_calendarimport')]

    operations = [
        migrations.AddField(
            model_name='calendarimport', name='calendar',
            field=models.CharField(default='acm', max_length=64),
        ),
        migrations.AlterField(
            model_name='caldavaccount', name='can_edit',
            field=models.BooleanField(default=False, help_text='Allow editing all public host calendars.'),
        ),
        migrations.CreateModel(
            name='ProvisionedCalendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sig', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='website.sigs')),
            ],
        ),
        migrations.CreateModel(
            name='CalendarMove',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source_path', models.CharField(max_length=512, unique=True)),
                ('destination_path', models.CharField(max_length=512)),
                ('source_etag', models.CharField(max_length=255)),
                ('fingerprint', models.CharField(max_length=64)),
                ('destination_etag', models.CharField(blank=True, max_length=255)),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
    ]
