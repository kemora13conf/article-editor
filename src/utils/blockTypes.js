import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import DescriptionIcon from '@mui/icons-material/Description';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


export const blockTypes = [
  {
    type: "h1",
    label: "Heading 1",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "h2",
    label: "Heading 2",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "h3",
    label: "Heading 3",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "h4",
    label: "Heading 4",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "h5",
    label: "Heading 5",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "h6",
    label: "Heading 6",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "caption",
    label: "Caption",
    icon: TextFieldsIcon,
    category: "text",
  },
  {
    type: "quote",
    label: "Quote",
    icon: FormatQuoteIcon,
    category: "text",
  },
  {
    type: "list",
    label: "Bullet List",
    icon: FormatListBulletedIcon,
    category: "text",
  },
  {
    type: "numbered-list",
    label: "Numbered List",
    icon: FormatListNumberedIcon,
    category: "text",
  },
  {
    type: "code",
    label: "Code Block",
    icon: CodeIcon,
    category: "code",
  },
  {
    type: "divider",
    label: "Divider",
    icon: HorizontalRuleIcon,
    category: "layout",
  },
  { type: "image", label: "Image", icon: ImageIcon, category: "media" },
  {
    type: "video",
    label: "Video",
    icon: VideocamIcon,
    category: "media",
  },
  { type: "pdf", label: "PDF", icon: DescriptionIcon, category: "media" },
  { type: "file", label: "File", icon: DescriptionIcon, category: "media" },
  {
    type: "section",
    label: "Section",
    icon: ViewModuleIcon,
    category: "layout",
  },
  {
    type: "flex",
    label: "Flex Container",
    icon: ViewColumnIcon,
    category: "layout",
  },
];

export const getBlockTypeInfo = (type) => {
  return blockTypes.find((bt) => bt.type === type) || blockTypes[0];
};

export const blockTypesByCategory = blockTypes.reduce((acc, block) => {
  if (!acc[block.category]) {
    acc[block.category] = [];
  }
  acc[block.category].push(block);
  return acc;
}, {});

export const PROGRAMMING_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'scss', label: 'SCSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
];
