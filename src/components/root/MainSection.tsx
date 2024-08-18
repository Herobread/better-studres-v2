import { RootContent } from '@src/features/parser';
import { ModuleContent } from '@src/features/parser/root/parseRootPageContent';
import React from 'react';

interface MainSectionProps {
  content: RootContent;
}

const yearLevels = [
  { label: 'First year', href: 'https://studres.cs.st-andrews.ac.uk/Teaching/First' },
  { label: 'Second year', href: 'https://studres.cs.st-andrews.ac.uk/Teaching/Second' },
  { label: 'Honours', href: 'https://studres.cs.st-andrews.ac.uk/Teaching/Hons' },
  { label: 'MSci', href: 'https://studres.cs.st-andrews.ac.uk/Teaching/MSci' },
  { label: 'Masters', href: 'https://studres.cs.st-andrews.ac.uk/Teaching/Masters' }
];

const MainSection: React.FC<MainSectionProps> = ( { content }) => (
  <section className="main py-10 bg-gray-50">
    <div className="container mx-auto">
      <p className="text-lg text-gray-700">
        Student Resources (StudRes) is a repository of teaching materials, principally for students enrolled on Computer Science modules. Staff may add or remove items to this library; students may read, copy or download them.
      </p>
      <p>
        <a href="https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes" className="text-blue-600 underline">More about Student Resources</a>
      </p>

      <h2 className="text-2xl font-semibold mt-8">Level-based resources</h2>

      <h3 className="text-xl font-semibold mt-4">Postgraduate research students</h3>
      <p>
        <a href="https://studres.cs.st-andrews.ac.uk/PGR" className="text-blue-600 underline">
          Materials relevant to PGR students
        </a>
      </p>

      <h3 className="text-xl font-semibold mt-4">Taught students</h3>
      <p>Materials relevant to students on taught programmes.</p>

      <div className="flex flex-wrap mt-4">
        {yearLevels.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md px-4 py-2 mx-2 my-2"
          >
            {label}
          </a>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8">Modules</h2>
      <div className="flex flex-wrap mt-4">
        {content.modules.map((module, index) => (
          <a key={index} href={module.url} className="text-blue-600 underline mx-2 my-2">
            {module.code}
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default MainSection;
