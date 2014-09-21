from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_paint.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    #(r'^paint/', include('paint.urls')),
    
    # display home page
    url(r'^$', 'paint.views.load_paint'),
    # save json data to database
    url(r'^save/$', 'paint.views.save_pic'),
    # display galary
    url(r'^display/$', 'paint.views.display_galary'),
    # display image
    url(r'^recent/([^/]+)$', 'paint.views.load'),
    
)
