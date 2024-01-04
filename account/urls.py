from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


from . import views

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('logout/', views.LogoutView.as_view(), name='auth_logout'),
    path('fetch-user/', views.FetchUserView.as_view(), name='fetch_user'),
]
