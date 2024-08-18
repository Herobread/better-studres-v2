import { getModuleEmoji } from '@src/features/contentEnhancers/emoji/modules';
import { RootContent } from '@src/features/parser';
import { QuickLinkLink } from '@src/features/quickLinks/components/quickLink/QuickLinkLink';
import React from 'react';


interface MainSectionProps {
  content: RootContent;
}

const MainSection: React.FC<MainSectionProps> = ({ content }) => (
  <div className="main py-10 bg-gray-50">

      <p className="text-lg text-gray-700">
        Student Resources (StudRes) is a repository of teaching materials, principally for students enrolled on Computer Science modules. Staff may add or remove items to this library; students may read, copy or download them.
      </p>
      <QuickLinkLink
        quickLink={{
          href: "https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes",
          icon: getModuleEmoji("More about Student Resources"),
          id: 0,
          name: "More about Student Resources",
        }}
      />
      <h2 className="text-2xl font-semibold mt-8">Level-based resources</h2>

      <h3 className="text-xl font-semibold mt-4">Postgraduate research students</h3>
      
      <QuickLinkLink
        quickLink={{
          href: "https://studres.cs.st-andrews.ac.uk/PGR",
          icon: getModuleEmoji("Materials relevant to PGR students"),
          id: 0,
          name: "Materials relevant to PGR students",
        }}
      />
    

      <h3 className="text-xl font-semibold mt-4">Taught students</h3>
      <p className="text-gray-700">Materials relevant to students on taught programmes.</p>

      <div className="flex flex-wrap mt-4">
      {content.taught_students.map((module, index) => (
        <QuickLinkLink
          quickLink={{
            href: module.url,
            icon: getModuleEmoji(module.url.split('/').pop() || ""),
            id: index, 
            name: module.url.split('/').pop() || "",
          }}
        />
      ))}
      </div>


    <h2 className="text-2xl font-semibold mt-8">Modules</h2>

    <div className="flex flex-wrap mt-4">
      {content.modules.map((module, index) => (

        <QuickLinkLink
          quickLink={{
            href: module.url,
            icon: getModuleEmoji(module.url),
            id: index,
            name: module.code,
          }}
        />
      ))}
    </div>

  </div>
);

export default MainSection;
