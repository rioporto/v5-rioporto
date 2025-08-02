'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Container } from '@/components/layout/Container';
import { EmptyState } from '@/components/shared/EmptyState';
import { 
  Play, 
  Clock, 
  Users, 
  Star,
  BookOpen,
  Award,
  Filter,
  GraduationCap
} from 'lucide-react';
import { courses } from '@/lib/mock-data';

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique levels and categories
  const levels = ['all', ...Array.from(new Set(courses.map(course => course.level)))];
  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesLevel && matchesCategory;
  });

  const levelLabels: Record<string, string> = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário', 
    advanced: 'Avançado',
    all: 'Todos'
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light mb-4">Cursos Online</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aprenda criptomoedas e trading do básico ao avançado com nossos cursos estruturados
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="text-sm font-medium text-muted-foreground self-center">
                Nível:
              </span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {levelLabels[level] || level}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
              <span className="text-sm font-medium text-muted-foreground self-center">
                Categoria:
              </span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'Todas' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all overflow-hidden">
                {/* Course Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <Play className="h-12 w-12 text-primary/60 group-hover:text-primary transition-colors" />
                  
                  {/* Course Level Badge */}
                  <Badge 
                    className="absolute top-3 left-3"
                    variant={
                      course.level === 'Iniciante' ? 'success' :
                      course.level === 'Intermediário' ? 'warning' : 'error'
                    }
                  >
                    {levelLabels[course.level]}
                  </Badge>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Category */}
                  <Badge variant="outline" className="text-xs mb-3 capitalize">
                    {course.category}
                  </Badge>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Progress (if enrolled) */}
                  {course.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.studentsCount.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} aulas
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(course.rating)}
                      </div>
                      <span className="text-sm font-medium">
                        {course.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({course.reviews} avaliações)
                      </span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{course.instructor.name}</span>
                    </div>
                    
                    {course.price ? (
                      <div className="text-right">
                        <div className="font-bold text-lg text-primary">
                          R$ {course.price.current.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    ) : (
                      <Badge variant="success">Gratuito</Badge>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    variant={course.progress !== undefined ? 'outline' : 'primary'}
                  >
                    {course.progress !== undefined ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continuar Curso
                      </>
                    ) : course.price ? (
                      'Comprar Curso'
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Começar Grátis
                      </>
                    )}
                  </Button>

                  {/* Certificate */}
                  {course.certificate && (
                    <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
                      <Award className="h-3 w-3 mr-1" />
                      Certificado incluído
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="w-16 h-16 text-muted-foreground" />}
            title="Nenhum curso encontrado"
            description="Tente ajustar os filtros para encontrar cursos disponíveis."
            action={{
              label: "Limpar filtros",
              onClick: () => {
                setSelectedLevel('all');
                setSelectedCategory('all');
              }
            }}
          />
        )}

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <div className="p-8 text-center">
              <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                Quer um curso personalizado?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Entre em contato conosco para criar um plano de estudos personalizado para suas necessidades
              </p>
              <Button size="lg">
                Falar com Especialista
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}