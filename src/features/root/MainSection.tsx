import { getModuleEmoji } from '@src/features/contentEnhancers/emoji/modules';
import { RootContent } from '@src/features/parser';
import { ModuleContent } from '@src/features/parser/root/parseRootPageContent';
import { QuickLinkContainer } from '@src/features/quickLinks/components';
import { QuickLinkLink } from '@src/features/quickLinks/components/quickLink/QuickLinkLink';

interface MainSectionProps {
  content: RootContent;
}

export function MainSection({ content }: MainSectionProps) {
  const renderModules = (modules: ModuleContent[]) => {
    let previousPrefix = '';
    let previousThirdChar = '';
    const moduleElements: JSX.Element[] = [];

    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      const currentPrefix = module.code.slice(0, 2);
      const currentThirdChar = module.code.charAt(2);

      const shouldBreak = index !== 0 && (currentPrefix !== previousPrefix || currentThirdChar !== previousThirdChar);

      previousPrefix = currentPrefix;
      previousThirdChar = currentThirdChar;

      if (shouldBreak) {
        moduleElements.push(<div className="col-span-full" key={`break-${index}`} />);
      }

      moduleElements.push(
        <QuickLinkContainer key={index}>
          <QuickLinkLink
            quickLink={{
              href: module.url,
              icon: getModuleEmoji(module.code),
              id: index,
              name: module.code,
            }}
          />
        </QuickLinkContainer>
      );
    }

    return moduleElements;
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
      <QuickLinkContainer>
        <QuickLinkLink
          quickLink={{
            href: 'https://studres.cs.st-andrews.ac.uk/PGR',
            icon: getModuleEmoji('Materials_relevant_to_PGR_students'),
            id: 0,
            name: 'Materials relevant to PGR students',
          }}
        />
      </QuickLinkContainer>


      <h3 className="text-xl font-semibold mt-4">Taught students</h3>
      <p>Materials relevant to students on taught programmes.</p>

      <div className="grid grid-cols-6 gap-4 mt-4">
        {content.taught_students.map((module, index) => (
          <QuickLinkContainer key={index}>
            <QuickLinkLink
              quickLink={{
                href: module.url,
                icon: getModuleEmoji(module.url.split('/').pop() || ''),
                id: index,
                name: module.url.split('/').pop() || '',
              }}
            />
          </QuickLinkContainer>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-4">Studres Wiki</h3>
      <QuickLinkContainer>
        <QuickLinkLink
          quickLink={{
            href: 'https://wiki.cs.st-andrews.ac.uk/index.php?title=StudRes',
            icon: getModuleEmoji('More_about_Student_Resources'),
            id: 0,
            name: 'More about Student Resources',
          }}
        />
      </QuickLinkContainer>

      <h2 className="text-2xl font-semibold mt-8">Modules</h2>

      <div className="grid grid-cols-6 gap-4 mt-4">
        {renderModules(content.modules)}
      </div>
    </div>
  );
}

export default MainSection;
