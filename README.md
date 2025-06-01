# Jezz.WTF Project Generator

A React-based form application that generates code blocks for adding projects to the Jezz.WTF portfolio website.

## Features

- **Interactive Form**: Easy-to-use form with all the fields needed for project creation
- **Live Preview**: See your generated code blocks in real-time
- **Copy to Clipboard**: One-click copying of generated code
- **Comprehensive Coverage**: Supports all project fields from the creation guide
- **Validation**: Form validation ensures required fields are filled

## What It Generates

The applet generates two code blocks:

1. **ProjectsPage.tsx Entry**: Code for the project listing page
2. **ProjectDetailPage.tsx Entry**: Complete project data object

## Usage

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application** in your browser at `http://localhost:5173/`

3. **Fill out the form** with your project details:
   - **Required fields**: ID, title, description, status, last updated
   - **Optional fields**: URLs, GitHub repo, screenshots, tech stack, etc.
   - **Content sections**: Custom content with different types
   - **Configuration flags**: Hide specific sections

4. **Generate code blocks** by clicking the "Generate Code Blocks" button

5. **Copy the generated code**:
   - First block goes into the projects array in `ProjectsPage.tsx`
   - Second block goes into the projectData object in `ProjectDetailPage.tsx`

## Form Sections

### Required Fields
- Project ID (auto-generated from title if empty)
- Title
- Short description
- Status (Live, Active, Private, etc.)
- Last updated date
- Color gradient for project card
- Featured flag

### Optional Fields
- Long description
- Live URL
- GitHub repository
- Open source flag
- Icon (emoji or Lucide icon name)
- Gallery folder

### Arrays & Lists
- Technologies used
- Key features
- Technical challenges
- Screenshots

### Custom Content Sections
- Flexible content with multiple types:
  - Single paragraph
  - Multiple paragraphs
  - Bulleted lists

### Configuration Flags
- Hide visual section
- Hide project info
- Hide tech stack

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── ProjectForm.tsx      # Main form component
│   └── CodeOutput.tsx       # Code generation and display
├── types/
│   └── project.ts           # TypeScript interfaces
└── App.tsx                  # Main application
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Based On

This applet is based on the [Project Page Creation Guide](../docs/project-page-creation-guide.md) and generates code that follows the exact specifications outlined in that document.
