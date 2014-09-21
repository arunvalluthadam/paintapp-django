from django.db import models

# Create your models here.
class Paint(models.Model):
    name = models.CharField(max_length=100)
    data = models.CharField(max_length=10000000)
    
    def __unicode__(self):
        return self.name
