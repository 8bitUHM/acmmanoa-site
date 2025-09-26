def sig_colors(request):
    """
    Context processor to provide SIG colors to templates.
    This allows the navbar to access SIG color information on any page.
    """
    # Check if we're on a SIG detail page
    if hasattr(request, 'resolver_match') and request.resolver_match:
        url_name = request.resolver_match.url_name
        if url_name == 'sig_detail':
            # Get the slug from the URL
            slug = request.resolver_match.kwargs.get('slug')
            if slug:
                try:
                    from .models import SIGS
                    sig = SIGS.objects.get(slug=slug)
                    return {
                        'sig_colors': {
                            'primary': sig.primary_color,
                            'secondary': sig.get_secondary_color(),
                            'light': sig.get_light_color()
                        }
                    }
                except SIGS.DoesNotExist:
                    pass
    
    # Return empty dict if not on a SIG page or SIG not found
    return {'sig_colors': None}
