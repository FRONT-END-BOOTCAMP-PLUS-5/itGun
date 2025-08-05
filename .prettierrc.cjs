module.exports = {
  printWidth: 140,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  semi: false,
  useTabs: true,
  tailwindConfig: './tailwind.config.js',

  // @trivago/prettier-plugin-sort-imports 설정
  importOrder: [
    '^@entities/(.*)$',
    '^@features/(.*)$',
    '^@processes/(.*)$',
    '^@shared/(.*)$',
    '^@views/(.*)$',
    '^@widgets/(.*)$',

    '^@const/(.*)$',
    '^@lib/(.*)$',
    '^@providers/(.*)$',
    '^@styles/(.*)$',
    '^@types/(.*)$',
    '^@ui/(.*)$',
    '^@utils/(.*)$',

    '^@icons/(.*)$',
    '^@images/(.*)$',
    '^@fonts/(.*)$',
    '^@locales/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  placeThisFirst: null,
  '/^[^\\d+]/': 'lexical',
  '/^\\d+/': 'numeric',

  // prettier-plugin-organize-attributes 설정
  attributeGroups: [
    '$ID',
    '$CLASS',
    '$DEFAULT',
    '$ANGULAR_STRUCTURAL_DIRECTIVE',
    '$ANGULAR_ELEMENT_REF',
    '$ANGULAR_ANIMATION',
    '$ANGULAR_ANIMATION_INPUT',
    '$ANGULAR_INPUT',
    '$ANGULAR_TWO_WAY_BINDING',
    '$ANGULAR_OUTPUT',
  ],
  attributeSort: 'ASC',

  plugins: [
    'prettier-plugin-organize-attributes',
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  plugins: ['prettier-plugin-tailwindcss'],
}
