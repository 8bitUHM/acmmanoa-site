from django.conf import settings
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('website', '0044_host_calendars'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='caldavaccount', name='can_edit',
            field=models.BooleanField(default=False, verbose_name='Can edit all calendars',
                help_text='Global editing access, including future calendars. Leave unchecked to use the calendar editing grants below.'),
        ),
        migrations.CreateModel(
            name='CalendarEditGrant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calendar', models.CharField(max_length=64, validators=[django.core.validators.RegexValidator(r'^(acm|sig-[1-9][0-9]*)$')])),
                ('account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='calendar_edit_grants', to='website.caldavaccount')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='calendar_edit_grants', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='calendareditgrant',
            constraint=models.CheckConstraint(
                check=(models.Q(user__isnull=False, account__isnull=True) | models.Q(user__isnull=True, account__isnull=False)),
                name='calendar_grant_one_identity'),
        ),
        migrations.AddConstraint(
            model_name='calendareditgrant',
            constraint=models.UniqueConstraint(fields=('user', 'calendar'), name='calendar_grant_unique_user'),
        ),
        migrations.AddConstraint(
            model_name='calendareditgrant',
            constraint=models.UniqueConstraint(fields=('account', 'calendar'), name='calendar_grant_unique_account'),
        ),
    ]
