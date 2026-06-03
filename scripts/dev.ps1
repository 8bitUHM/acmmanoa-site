param(
    [ValidateSet("up", "down", "migrate", "superuser", "logs")]
    [string]$Command = "up",
    [string]$Service = "web"
)

Set-Location (Split-Path $PSScriptRoot -Parent)

switch ($Command) {
    "up"        { docker compose up --build }
    "down"      { docker compose down }
    "migrate"   { docker compose exec web python manage.py migrate }
    "superuser" { docker compose exec web python manage.py createsuperuser }
    "logs"      { docker compose logs -f $Service }
}
