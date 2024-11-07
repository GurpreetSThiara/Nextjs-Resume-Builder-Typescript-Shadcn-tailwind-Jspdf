import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  MinusCircle, ArrowUp, ArrowDown, Edit2 } from 'lucide-react';
import { ResumeData } from '@/lib/types';

interface SectionProps {
  section: {
    id: string;
    title: string;
    content: Record<string, string[]>;
  };
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;
  removeSection: (sectionId: string) => void;
  addKey: (sectionId: string, key: string) => void;
  removeKey: (sectionId: string, key: string) => void;
  addBulletPoint: (sectionId: string, key: string) => void;
  removeBulletPoint: (sectionId: string, key: string, index: number) => void;
  handleBulletPointChange: (sectionId: string, key: string, index: number, value: string) => void;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const Section = React.memo<SectionProps>(({
  section,
  moveSection,
  removeSection,
  addKey,
  removeKey,
  addBulletPoint,
  removeBulletPoint,
  handleBulletPointChange,
  setResumeData,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [editingKeyId, setEditingKeyId] = useState<string | null>(null);
  const [newKeyValue, setNewKeyValue] = useState('');

  const handleKeyEdit = useCallback((oldKey: string, newKey: string) => {
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === section.id
          ? {
              ...s,
              content: Object.fromEntries(
                Object.entries(s.content).map(([k, v]) =>
                  k === oldKey ? [newKey, v] : [k, v]
                )
              )
            }
          : s
      )
    }));
    setIsEditingKey(false);
    setEditingKeyId(null);
  }, [section.id, setResumeData]);

  return (
    <div key={section.id} className="border p-4 rounded-md mb-4">
      <div className="flex items-center justify-between mb-2">
        {editingTitle ? (
          <Input
            value={section.title}
            onChange={(e) => setResumeData(prev => ({
              ...prev,
              sections: prev.sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s)
            }))}
            onBlur={() => setEditingTitle(false)}
            autoFocus
          />
        ) : (
          <h2 className="text-xl font-bold">{section.title}</h2>
        )}
        <div className="flex space-x-2">
          <Button type="button" size="icon" variant="outline" onClick={() => setEditingTitle(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => moveSection(section.id, 'up')}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => moveSection(section.id, 'down')}>
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={() => removeSection(section.id)}>
            <MinusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {Object.entries(section.content).map(([key, bullets]) => (
        <div key={key} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            {isEditingKey && editingKeyId === key ? (
              <Input
                value={newKeyValue}
                onChange={(e) => setNewKeyValue(e.target.value)}
                onBlur={() => handleKeyEdit(editingKeyId, newKeyValue)}
                autoFocus
              />
            ) : (
              <Input
                value={key}
                readOnly
                className="font-semibold"
                onClick={() => {
                  setIsEditingKey(true);
                  setEditingKeyId(key);
                  setNewKeyValue(key);
                }}
              />
            )}
            <Button type="button" size="sm" variant="outline" onClick={() => removeKey(section.id, key)}>
              Remove
            </Button>
          </div>
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                value={bullet}
                onChange={(e) => handleBulletPointChange(section.id, key, index, e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="button" size="icon" variant="outline" onClick={() => removeBulletPoint(section.id, key, index)}>
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" size="sm" variant="outline" onClick={() => addBulletPoint(section.id, key)}>
            Add Bullet Point
          </Button>
        </div>
      ))}

      <div className="flex items-center mt-4">
        <Input
          placeholder="New key"
          value={newKeyValue}
          onChange={(e) => setNewKeyValue(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button variant={'purple'} type="button" onClick={() => {
          addKey(section.id, newKeyValue);
          setNewKeyValue('');
        }}>
          Add Key
        </Button>
      </div>
    </div>
  );
});

Section.displayName = 'Section';
