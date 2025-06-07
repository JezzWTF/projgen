# Jezz.WTF Project Generator

A React-based form application that generates code blocks for adding projects to the Jezz.WTF portfolio website.

## ✨ Recent Major Updates

This version introduces comprehensive UI/UX improvements focused on reducing cognitive load and improving user experience:

### 🎯 Key Improvements
- **Progressive Disclosure**: Collapsible sections reduce initial visual complexity by ~70%
- **Dual-Mode Interface**: Choose between guided wizard or quick form mode
- **Smart Contextual Fields**: Fields appear only when relevant
- **Enhanced Visual Hierarchy**: Clear sections with completion indicators
- **Bulk Operations**: Paste multiple items at once for arrays
- **Auto-generation**: Smart defaults and ID generation from title
- **Improved Validation**: Real-time feedback and error prevention

## Features

### Core Functionality
- **Interactive Form**: Easy-to-use form with all the fields needed for project creation
- **Guided Wizard Mode**: 8-step wizard for new users or complex projects
- **Copy to Clipboard**: One-click copying of generated code
- **Comprehensive Coverage**: Supports all project fields from the creation guide
- **Form Validation**: Smart validation ensures required fields are filled
- **Data Persistence**: Form data persists when switching between modes

### User Experience Enhancements
- **Progressive Disclosure**: Essential fields shown first, advanced options collapsible
- **Contextual Intelligence**: GitHub options only appear when repository is specified
- **Bulk Data Entry**: Paste multiple technologies, features, or challenges at once
- **Smart Defaults**: Auto-generate project IDs, provide example data
- **Visual Feedback**: Completion indicators, hover states, and smooth animations
- **Responsive Design**: Works seamlessly across all screen sizes

## Interface Modes

### 🚀 Quick Form Mode (Default)
Perfect for experienced users who want efficient access to all functionality:
- All sections available with progressive disclosure
- Essential fields always visible
- Advanced options in collapsible sections
- Bulk operations for array inputs
- Smart contextual field display

### 🧭 Guided Wizard Mode
Ideal for new users or complex project setups:
1. **Project Basics** - Essential information (title, description, status)
2. **Project Identity** - ID, color theme, icon, featured flag
3. **Links & Repository** - URLs, GitHub, detailed description
4. **Technical Details** - Tech stack, features, challenges
5. **Visual Assets** - Screenshots, gallery configuration
6. **Content Sections** - Custom content blocks
7. **Advanced Settings** - Display configuration flags
8. **Review & Generate** - Summary and final submission

## What It Generates

The application generates a single block:

1. **projectData.ts Entry**: Complete project data object

## Usage

1. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Open the application** in your browser at `http://localhost:5173/`

3. **Choose your preferred mode**:
   - **Quick Form**: Jump right in with the streamlined form
   - **Guided Setup**: Use the step-by-step wizard

4. **Fill out your project details**:
   - **Required fields**: ID, title, description, status, last updated
   - **Optional fields**: URLs, GitHub repo, screenshots, tech stack, etc.
   - **Content sections**: Custom content with different types
   - **Configuration flags**: Hide specific sections

5. **Generate and copy code block**:
   - Click "Generate Code Block" to create the output
   - Use the tabbed interface to view code and next steps
   - Copy generated code with one click

## Form Sections & Features

### Essential Fields (Always Visible)
- Project ID (auto-generated from title if not manually set)
- Title
- Short description
- Status (Live, Active, Private, etc.)
- Last updated date
- Featured flag

### Project Details (Collapsible)
- Long description
- Live URL
- GitHub repository (with contextual open source toggle)
- Color gradient for project card
- Icon (emoji or Lucide icon name)

### Content & Features (Collapsible)
- Technologies used (with bulk paste support)
- Key features (with bulk paste support)
- Technical challenges (with bulk paste support)
- Screenshots (with bulk paste support)
- Gallery folder configuration

### Advanced Options (Collapsible)
- Custom content sections with multiple types:
  - Single paragraph
  - Multiple paragraphs
  - Bulleted lists
- Configuration flags:
  - Hide visual section
  - Hide project info
  - Hide tech stack
  - Hide overview section

## New Components & Architecture

### Core Components
- **`ProjectFormImproved.tsx`**: Enhanced form with progressive disclosure
- **`ProjectWizard.tsx`**: 8-step guided wizard interface
- **`FormSection.tsx`**: Reusable collapsible section container
- **`ArrayInput.tsx`**: Unified interface for array management with bulk operations
- **`Tabs.tsx`**: Tabbed interface for code output and next steps
- **`Header.tsx`** & **`Footer.tsx`**: Consistent branding and navigation

### UI Enhancement Components
- **`WizardNavigation.tsx`**: Step-by-step navigation with progress indicators
- **`WizardStep.tsx`**: Individual wizard step container
- **`NextStepsDisplay.tsx`**: Post-generation guidance and instructions
- **`Tooltip.tsx`**: Contextual help and information
- **`UIComparisonDemo.tsx`**: Interactive before/after demonstration

## Technologies Used

- **React 19** with TypeScript
- **Vite 6** for build tooling
- **Tailwind CSS 4** for styling
- **Lucide React** for icons
- **React Icons** for additional iconography
- **PNPM** for package management

## Project Structure

```
src/
├── components/
│   ├── ProjectFormImproved.tsx    # Enhanced form with progressive disclosure
│   ├── ProjectWizard.tsx          # 8-step guided wizard
│   ├── FormSection.tsx            # Reusable collapsible sections
│   ├── ArrayInput.tsx             # Unified array input with bulk operations
│   ├── CodeOutput.tsx             # Code generation and display
│   ├── NextStepsDisplay.tsx       # Post-generation guidance
│   ├── Tabs.tsx                   # Tabbed interface component
│   ├── Header.tsx                 # Application header
│   ├── Footer.tsx                 # Application footer
│   ├── WizardNavigation.tsx       # Wizard step navigation
│   ├── WizardStep.tsx             # Individual wizard steps
│   ├── Tooltip.tsx                # Contextual help tooltips
│   └── UI*.tsx                    # UI demonstration components
├── types/
│   ├── project.ts                 # TypeScript interfaces
│   └── projectDefaults.ts         # Default and example data
└── App.tsx                        # Main application with dual-mode support
```

## Development

```bash
# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev

# Build for production
npm run build
# or
pnpm build

# Build with version increment
pnpm build:patch   # Increment patch version
pnpm build:minor   # Increment minor version
pnpm build:major   # Increment major version
```

## UI/UX Design Principles

The improvements follow established design principles:

1. **Progressive Disclosure**: Show information when needed, reduce initial complexity
2. **Recognition over Recall**: Visual cues and consistent patterns throughout
3. **Flexibility and Efficiency**: Dual-mode approach serves both novice and expert users
4. **Aesthetic and Minimalist Design**: Remove unnecessary elements, focus on content
5. **Error Prevention**: Smart defaults, validation, and contextual guidance

## Performance & Accessibility

- **Efficient Rendering**: Proper state management and component optimization
- **Keyboard Navigation**: Full keyboard accessibility throughout the interface
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Fast Loading**: Optimized bundle size and lazy loading where appropriate

## Based On

This application is based on the [Project Page Creation Guide](../docs/project-page-creation-guide.md) and generates code that follows the exact specifications outlined in that document.

## Contributing

The codebase uses modern React patterns and TypeScript for type safety. Key areas for contribution:

- **Enhanced Validation**: More sophisticated field validation
- **Template System**: Pre-configured project types
- **Auto-save**: Local storage persistence
- **Export/Import**: Save and load project configurations
- **Analytics**: Usage pattern tracking for further optimization