'use client';

import React, { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: 'trading' | 'social' | 'learning' | 'achievement' | 'special';
  icon: string;
  description: string;
  maxLevel: number;
  currentLevel: number;
  pointsRequired: number;
  prerequisites?: string[];
  effects: {
    level: number;
    bonus: string;
    description: string;
  }[];
  isUnlocked: boolean;
}

interface SkillTree {
  category: string;
  name: string;
  icon: string;
  color: string;
  skills: Skill[];
}

interface SkillPointsProps {
  skillTrees: SkillTree[];
  availablePoints: number;
  onAllocatePoint: (skillId: string) => void;
  onResetSkills?: () => void;
  className?: string;
}

export const SkillPoints: React.FC<SkillPointsProps> = ({
  skillTrees,
  availablePoints,
  onAllocatePoint,
  onResetSkills,
  className = ''
}) => {
  const [selectedTree, setSelectedTree] = useState(skillTrees[0]?.category || '');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentTree = skillTrees.find(tree => tree.category === selectedTree);
  
  const totalPointsSpent = skillTrees.reduce((total, tree) => 
    total + tree.skills.reduce((treeTotal, skill) => treeTotal + skill.currentLevel, 0), 0
  );

  const getTreeColor = (color: string) => {
    const colors: Record<string, string> = {
      green: 'from-green-400 to-green-600',
      blue: 'from-blue-400 to-blue-600',
      purple: 'from-purple-400 to-purple-600',
      orange: 'from-orange-400 to-red-500',
      pink: 'from-pink-400 to-purple-500'
    };
    return colors[color] || 'from-gray-400 to-gray-600';
  };

  const canAllocatePoint = (skill: Skill) => {
    if (availablePoints <= 0) return false;
    if (skill.currentLevel >= skill.maxLevel) return false;
    if (!skill.isUnlocked) return false;
    
    // Check prerequisites
    if (skill.prerequisites) {
      const allSkills = skillTrees.flatMap(tree => tree.skills);
      return skill.prerequisites.every(prereqId => {
        const prereq = allSkills.find(s => s.id === prereqId);
        return prereq && prereq.currentLevel > 0;
      });
    }
    
    return true;
  };

  const getSkillProgress = (skill: Skill) => {
    return (skill.currentLevel / skill.maxLevel) * 100;
  };

  const getCurrentEffect = (skill: Skill) => {
    if (skill.currentLevel === 0) return null;
    return skill.effects.find(effect => effect.level === skill.currentLevel);
  };

  const getNextEffect = (skill: Skill) => {
    if (skill.currentLevel >= skill.maxLevel) return null;
    return skill.effects.find(effect => effect.level === skill.currentLevel + 1);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <span>🌟</span>
            <span>Skill Trees</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Allocate skill points to unlock powerful abilities
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {availablePoints}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Available Points
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            {totalPointsSpent} spent
          </div>
        </div>
      </div>

      {/* Tree Selector */}
      <div className="flex flex-wrap gap-2">
        {skillTrees.map((tree) => (
          <button
            key={tree.category}
            onClick={() => setSelectedTree(tree.category)}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
              selectedTree === tree.category
                ? `bg-gradient-to-r ${getTreeColor(tree.color)} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-xl">{tree.icon}</span>
            <span>{tree.name}</span>
            <span className="text-sm opacity-75">
              ({tree.skills.reduce((sum, skill) => sum + skill.currentLevel, 0)})
            </span>
          </button>
        ))}
      </div>

      {/* Current Tree Display */}
      {currentTree && (
        <div className="space-y-4">
          {/* Tree Header */}
          <div className={`p-4 rounded-xl bg-gradient-to-r ${getTreeColor(currentTree.color)} text-white`}>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{currentTree.icon}</span>
              <div>
                <h3 className="text-xl font-bold">{currentTree.name} Tree</h3>
                <p className="text-sm opacity-90">
                  {currentTree.skills.reduce((sum, skill) => sum + skill.currentLevel, 0)} / {currentTree.skills.reduce((sum, skill) => sum + skill.maxLevel, 0)} points allocated
                </p>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentTree.skills.map((skill) => {
              const canAllocate = canAllocatePoint(skill);
              const progress = getSkillProgress(skill);
              const currentEffect = getCurrentEffect(skill);
              const nextEffect = getNextEffect(skill);
              
              return (
                <div
                  key={skill.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                    skill.isUnlocked
                      ? skill.currentLevel > 0
                        ? `bg-gradient-to-br ${getTreeColor(currentTree.color)}/10 border-${currentTree.color}-300 shadow-lg`
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                      : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-60'
                  }`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`text-3xl ${skill.isUnlocked ? '' : 'grayscale opacity-50'}`}>
                        {skill.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Level {skill.currentLevel} / {skill.maxLevel}
                        </div>
                      </div>
                    </div>
                    
                    {/* Allocate Button */}
                    {skill.isUnlocked && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (canAllocate) {
                            onAllocatePoint(skill.id);
                          }
                        }}
                        disabled={!canAllocate}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-200 ${
                          canAllocate
                            ? `border-${currentTree.color}-500 text-${currentTree.color}-500 hover:bg-${currentTree.color}-500 hover:text-white`
                            : 'border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        +
                      </button>
                    )}
                  </div>

                  {/* Skill Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getTreeColor(currentTree.color)} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current Effect */}
                  {currentEffect && (
                    <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <div className="text-xs font-semibold text-green-700 dark:text-green-300">
                        Current: {currentEffect.bonus}
                      </div>
                    </div>
                  )}

                  {/* Next Effect Preview */}
                  {nextEffect && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                        Next: {nextEffect.bonus}
                      </div>
                    </div>
                  )}

                  {/* Prerequisites */}
                  {skill.prerequisites && skill.prerequisites.length > 0 && !skill.isUnlocked && (
                    <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                      <div className="text-xs text-red-600 dark:text-red-400">
                        Requires: {skill.prerequisites.map(prereqId => {
                          const prereq = skillTrees.flatMap(t => t.skills).find(s => s.id === prereqId);
                          return prereq?.name;
                        }).join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Locked Indicator */}
                  {!skill.isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Max Level Indicator */}
                  {skill.currentLevel === skill.maxLevel && (
                    <div className="absolute -top-2 -right-2">
                      <div className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-bold">
                        MAX
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reset Button */}
      {onResetSkills && totalPointsSpent > 0 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
          >
            Reset All Skills
          </button>
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Skill Header */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl">{selectedSkill.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedSkill.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level {selectedSkill.currentLevel} / {selectedSkill.maxLevel}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedSkill.description}
            </p>

            {/* All Effects */}
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Effects by Level:</h4>
              {selectedSkill.effects.map((effect) => (
                <div
                  key={effect.level}
                  className={`p-2 rounded-lg ${
                    effect.level <= selectedSkill.currentLevel
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                      : effect.level === selectedSkill.currentLevel + 1
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <div className="text-sm font-semibold">
                    Level {effect.level}: {effect.bonus}
                  </div>
                  <div className="text-xs">{effect.description}</div>
                </div>
              ))}
            </div>

            {/* Prerequisites */}
            {selectedSkill.prerequisites && selectedSkill.prerequisites.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Prerequisites:</h4>
                <div className="space-y-1">
                  {selectedSkill.prerequisites.map(prereqId => {
                    const prereq = skillTrees.flatMap(t => t.skills).find(s => s.id === prereqId);
                    if (!prereq) return null;
                    
                    return (
                      <div
                        key={prereqId}
                        className={`text-sm ${
                          prereq.currentLevel > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {prereq.currentLevel > 0 ? '✓' : '✗'} {prereq.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedSkill(null)}
                className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
              {canAllocatePoint(selectedSkill) && (
                <button
                  onClick={() => {
                    onAllocatePoint(selectedSkill.id);
                    setSelectedSkill(null);
                  }}
                  className={`flex-1 py-2 bg-gradient-to-r ${getTreeColor(currentTree?.color || 'blue')} text-white rounded-lg font-semibold transition-colors`}
                >
                  Allocate Point
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Reset All Skills?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will refund all {totalPointsSpent} skill points and reset all skills to level 0. This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetSkills?.();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillPoints;