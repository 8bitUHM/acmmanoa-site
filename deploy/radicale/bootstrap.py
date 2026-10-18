"""Provision the private service login; Django manages external CalDAV accounts."""
import hashlib
import hmac
import os
from pathlib import Path

import bcrypt

password = hmac.new(
    os.environ['SECRET_KEY'].encode(), b'acmmanoa-caldav-service-v1', hashlib.sha256,
).hexdigest()
users = Path('/data/users')
users.write_text('calendar-admin:' + bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode() + '\n')
users.chmod(0o600)
os.execvp('radicale', ['radicale', '--config', '/etc/radicale/config'])
