from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from paint.models import Paint

# Create your views here.

# display home page
def load_paint(request):
    return render_to_response('index.html')

# save json data to database
@csrf_exempt 
def save_pic(request):
    name = request.POST.get('fname')
    data = request.POST.get('whole_data')
    insert = Paint(name=name, data=data)
    insert.save()
    return render_to_response('index.html')

# display galary
def display_galary(request):
    posts=[dict(id=i.id, title=i.name) for i in Paint.objects.order_by('id')]
    return render_to_response('recent.html', {'posts': posts})

# display image
def load(request, filename):
    posts = [dict(id=i.id, title=i.name, data=i.data) for i in Paint.objects.filter(name=filename)]
    #posts = {}
    #for i in Paint.objects.filter(name=filename):
    #    posts['title'] = i.name
    #    posts['data'] = i.data
    return render_to_response('loadpic.html', {'posts': posts})


