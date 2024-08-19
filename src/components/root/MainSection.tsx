import { getModuleEmoji } from '@src/features/contentEnhancers/emoji/modules';
import { RootContent } from '@src/features/parser';
import { QuickLinkLink } from '@src/features/quickLinks/components/quickLink/QuickLinkLink';
import React from 'react';

interface MainSectionProps {
  content: RootContent;
}

const MainSection: React.FC<MainSectionProps> = ({ content }) => {
  const renderModules = (modules: any[]) => {
    let previousPrefix = '';
    let previousThirdChar = '';

    return modules.map((module, index) => {
      const currentPrefix = module.code.slice(0, 2); 
      const currentThirdChar = module.code.charAt(2);

      const shouldBreak =
        index === 0 || currentPrefix !== previousPrefix || currentThirdChar !== previousThirdChar;

      previousPrefix = currentPrefix;
      previousThirdChar = currentThirdChar;

      return (
        <React.Fragment key={index}>
          {shouldBreak && index !== 0 && <div className="w-full"></div>}
          <QuickLinkLink
            quickLink={{
              href: module.url,
              icon: getModuleEmoji(module.code),
              id: index,
              name: module.code,
            }}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div
      className="
      data-[state=open]:animate-in data-[state=closed]:animate-out 
      data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
      data-[direction=bottom][data-state=open]:slide-in-from-bottom-10 
      data-[direction=left][data-state=open]:slide-in-from-left-10
      data-[direction=right][data-state=open]:slide-in-from-right-10
      data-[direction=top][data-state=open]:slide-in-from-top-10
    "
    >
      <h3 className="text-xl font-semibold">Postgraduate research students</h3>
      <div className='flex flex-wrap'>
      <QuickLinkLink
        quickLink={{
          href: 'https://studres.cs.st-andrews.ac.uk/PGR',
          icon: getModuleEmoji('Materials_relevant_to_PGR_students'),
          id: 0,
          name: 'Materials relevant to PGR students',
        }}
      />
      </div>

      <h3 className="text-xl font-semibold mt-4">Taught students</h3>
      <p>Materials relevant to students on taught programmes.</p>

      <div className="flex flex-wrap mt-4">
        {content.taught_students.map((module, index) => (
          <QuickLinkLink
            key={index}
            quickLink={{
              href: module.url,
              icon: getModuleEmoji(module.url.split('/').pop() || ''),
              id: index,
              name: module.url.split('/').pop() || '',
            }}
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-4">Studres Wiki</h3>
      <div className='flex flex-wrap'>
        <QuickLinkLink
          quickLink={{
            href: 'https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes',
            icon: getModuleEmoji('More_about_Student_Resources'),
            id: 0,
            name: 'More about Student Resources',
          }}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8">Modules</h2>

      <div className="flex flex-wrap mt-4">{renderModules(content.modules)}</div>
    </div>
  );
};

export default MainSection;
