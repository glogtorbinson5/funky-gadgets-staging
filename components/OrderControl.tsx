'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { PromptSection } from '@/types/prompt';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

interface OrderItemProps {
  section: PromptSection;
}

function OrderItem({ section, isLast }: OrderItemProps & { isLast: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="flex items-center gap-2">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="px-3 py-2 bg-white border border-gray-300 rounded-md cursor-grab active:cursor-grabbing hover:bg-gray-50 font-medium text-sm text-gray-700"
      >
        #{section}
      </div>
      {!isLast && <ChevronRightIcon className="w-5 h-5 text-gray-400" />}
    </div>
  );
}

interface Props {
  sections: PromptSection[];
  onReorder: (newOrder: PromptSection[]) => void;
}

export default function OrderControl({ sections, onReorder }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newOrder = arrayMove(sections, sections.indexOf(active.id), sections.indexOf(over.id));
      onReorder(newOrder);
    }
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="text-sm font-semibold text-gray-700 mb-3">Prompt Order:</div>
        <div className="flex items-center gap-2 flex-wrap">
          {sections.map((section, index) => (
            <div key={section} className="flex items-center gap-2">
              <div className="px-3 py-2 bg-white border border-gray-300 rounded-md font-medium text-sm text-gray-700">
                #{section}
              </div>
              {index < sections.length - 1 && <ChevronRightIcon className="w-5 h-5 text-gray-400" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="text-sm font-semibold text-gray-700 mb-3">Prompt Order:</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex items-center gap-2 flex-wrap">
            {sections.map((section, index) => (
              <OrderItem key={section} section={section} isLast={index === sections.length - 1} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
