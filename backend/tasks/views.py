from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'priority', 'created_at']

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user)
        
        # Filtering by status
        status_param = self.request.query_params.get('status')
        if status_param == 'completed':
            queryset = queryset.filter(is_complete=True)
        elif status_param == 'pending':
            queryset = queryset.filter(is_complete=False)
            
        return queryset
