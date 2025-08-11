from django.shortcuts import render, redirect
from .forms import UserProfileForm
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES)
        if form.is_valid():
            image = request.FILES.get('profile_image')
            if image and image.size > 1024 * 1024:
                messages.error(request, 'Image size must be less than 1 MB')
            else:
                form.save()
                messages.success(request, 'Registration successful!')
                return redirect('login')
    else:
        form = UserProfileForm()
    return render(request, 'register.html', {'form': form})