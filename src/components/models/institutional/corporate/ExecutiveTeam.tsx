'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Mail, ExternalLink, MapPin, Calendar } from 'lucide-react';

interface Executive {
  id: string;
  name: string;
  position: string;
  department?: string;
  bio: string;
  photo: string;
  education?: string[];
  experience?: string[];
  achievements?: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  joinDate?: string;
  location?: string;
  specialties?: string[];
}

interface ExecutiveTeamProps {
  executives: Executive[];
  variant?: 'grid' | 'list' | 'minimal';
  showBio?: boolean;
  showEducation?: boolean;
  showExperience?: boolean;
  maxBioLength?: number;
  className?: string;
}

const ExecutiveTeam: React.FC<ExecutiveTeamProps> = ({
  executives,
  variant = 'grid',
  showBio = true,
  showEducation = false,
  showExperience = false,
  maxBioLength = 200,
  className
}) => {
  const [expandedBios, setExpandedBios] = React.useState<Set<string>>(new Set());
  const [selectedExecutive, setSelectedExecutive] = React.useState<Executive | null>(null);

  const toggleBio = (id: string) => {
    const newExpanded = new Set(expandedBios);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedBios(newExpanded);
  };

  const truncateBio = (bio: string, maxLength: number) => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength) + '...';
  };

  const renderSocialLinks = (social?: Executive['social']) => {
    if (!social) return null;

    return (
      <div className="flex items-center space-x-3">
        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        )}
        {social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        )}
        {social.email && (
          <a
            href={`mailto:${social.email}`}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        )}
        {social.website && (
          <a
            href={social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Website"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  };

  const renderExecutiveCard = (executive: Executive) => {
    const isExpanded = expandedBios.has(executive.id);
    const shouldTruncate = executive.bio.length > maxBioLength;
    const displayBio = shouldTruncate && !isExpanded 
      ? truncateBio(executive.bio, maxBioLength)
      : executive.bio;

    return (
      <div
        key={executive.id}
        className={cn(
          'bg-card border border-border rounded-lg overflow-hidden transition-all duration-300',
          'hover:shadow-lg hover:border-primary/50',
          variant === 'minimal' && 'border-0 shadow-none hover:shadow-md'
        )}
      >
        {/* Photo */}
        <div className="relative">
          <img
            src={executive.photo}
            alt={executive.name}
            className={cn(
              'w-full object-cover',
              variant === 'minimal' ? 'h-48' : 'h-64'
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className={cn(
          variant === 'minimal' ? 'p-4' : 'p-6'
        )}>
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-1">
              {executive.name}
            </h3>
            <div className="space-y-1">
              <p className="text-primary font-semibold">
                {executive.position}
              </p>
              {executive.department && (
                <p className="text-sm text-muted-foreground">
                  {executive.department}
                </p>
              )}
            </div>
          </div>

          {/* Meta info */}
          <div className="space-y-2 mb-4">
            {executive.location && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{executive.location}</span>
              </div>
            )}
            
            {executive.joinDate && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {executive.joinDate}</span>
              </div>
            )}
          </div>

          {/* Specialties */}
          {executive.specialties && executive.specialties.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {executive.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
                {executive.specialties.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    +{executive.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bio */}
          {showBio && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {displayBio}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => toggleBio(executive.id)}
                  className="text-primary text-sm font-medium hover:text-primary/80 transition-colors mt-2"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          )}

          {/* Education */}
          {showEducation && executive.education && executive.education.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Education</h4>
              <ul className="space-y-1">
                {executive.education.map((edu, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {edu}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience */}
          {showExperience && executive.experience && executive.experience.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Experience</h4>
              <ul className="space-y-1">
                {executive.experience.slice(0, 3).map((exp, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {exp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center justify-between">
            {renderSocialLinks(executive.social)}
            
            <button
              onClick={() => setSelectedExecutive(executive)}
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderListItem = (executive: Executive) => (
    <div
      key={executive.id}
      className="flex items-start space-x-6 p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-300"
    >
      {/* Photo */}
      <div className="flex-shrink-0">
        <img
          src={executive.photo}
          alt={executive.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {executive.name}
            </h3>
            <p className="text-primary font-semibold">{executive.position}</p>
            {executive.department && (
              <p className="text-sm text-muted-foreground">{executive.department}</p>
            )}
          </div>
          
          {renderSocialLinks(executive.social)}
        </div>

        {/* Meta */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          {executive.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{executive.location}</span>
            </div>
          )}
          {executive.joinDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Joined {executive.joinDate}</span>
            </div>
          )}
        </div>

        {/* Specialties */}
        {executive.specialties && executive.specialties.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {executive.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {/* Bio */}
        {showBio && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {truncateBio(executive.bio, maxBioLength)}
          </p>
        )}
      </div>
    </div>
  );

  const renderMinimalCard = (executive: Executive) => (
    <div
      key={executive.id}
      className="text-center group cursor-pointer"
      onClick={() => setSelectedExecutive(executive)}
    >
      <div className="relative mb-4">
        <img
          src={executive.photo}
          alt={executive.name}
          className="w-32 h-32 object-cover rounded-full mx-auto transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {executive.name}
      </h3>
      <p className="text-sm text-primary font-medium">{executive.position}</p>
      {executive.department && (
        <p className="text-xs text-muted-foreground mt-1">{executive.department}</p>
      )}
      
      <div className="mt-3 flex justify-center">
        {renderSocialLinks(executive.social)}
      </div>
    </div>
  );

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Executive Team
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet our experienced leadership team driving innovation and growth 
          in the cryptocurrency exchange industry.
        </p>
      </div>

      {/* Team Grid */}
      <div className={cn(
        variant === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
        variant === 'list' && 'space-y-6',
        variant === 'minimal' && 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'
      )}>
        {executives.map(executive => {
          if (variant === 'list') return renderListItem(executive);
          if (variant === 'minimal') return renderMinimalCard(executive);
          return renderExecutiveCard(executive);
        })}
      </div>

      {/* Modal for full profile */}
      {selectedExecutive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                {selectedExecutive.name}
              </h3>
              <button
                onClick={() => setSelectedExecutive(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={selectedExecutive.photo}
                  alt={selectedExecutive.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-primary font-semibold text-lg mb-1">
                    {selectedExecutive.position}
                  </p>
                  {selectedExecutive.department && (
                    <p className="text-muted-foreground mb-3">{selectedExecutive.department}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {selectedExecutive.location && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedExecutive.location}</span>
                      </div>
                    )}
                    {selectedExecutive.joinDate && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {selectedExecutive.joinDate}</span>
                      </div>
                    )}
                  </div>
                  
                  {renderSocialLinks(selectedExecutive.social)}
                </div>
              </div>

              {/* Full Bio */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">About</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedExecutive.bio}
                  </p>
                </div>

                {/* Specialties */}
                {selectedExecutive.specialties && selectedExecutive.specialties.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExecutive.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {selectedExecutive.education && selectedExecutive.education.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Education</h4>
                    <ul className="space-y-2">
                      {selectedExecutive.education.map((edu, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Experience */}
                {selectedExecutive.experience && selectedExecutive.experience.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Experience</h4>
                    <ul className="space-y-2">
                      {selectedExecutive.experience.map((exp, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {selectedExecutive.achievements && selectedExecutive.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedExecutive.achievements.map((achievement, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutiveTeam;