from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import validate_email
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UsernameValidator(UnicodeUsernameValidator):
    regex = r'^[\w.@+-]+\Z'
    message = (
        "유효한 닉네임을 입력해주세요. "
        "숫자, 그리고 특수문자는 포함될 수 없습니다."
    )


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get('password')
        }

        user = User.objects.filter(email=attrs.get('username')).first()
        if user:
            credentials['username'] = user

        return super().validate(credentials)


class RegisterSerializer(serializers.ModelSerializer):
    username_validator = UsernameValidator()
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    passwordConfirm = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(write_only=True, required=True)
    username = serializers.CharField(
        write_only=True,
        required=True,
        validators=[username_validator]
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'passwordConfirm')

    def validate(self, value):
        if value['password'] != value['passwordConfirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        if validate_email(value['email']):
            raise serializers.ValidationError({"email": "Email is not valid."})
        return value

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'],
                                   email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user
