import Text from "./Text"
import { TextProps } from "./Text.types"

const D1: React.FC<TextProps> = ({
  children,
  size = "text-[32px]",
  fontWeight = "bold",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[40px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const H1: React.FC<TextProps> = ({
  children,
  size = "text-[28px]",
  fontWeight = "bold",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[36px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const H2: React.FC<TextProps> = ({
  children,
  size = "text-2xl",
  fontWeight = "bold",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[32px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const S1: React.FC<TextProps> = ({
  children,
  size = "text-xl",
  fontWeight = "bold",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[26px] ${className}`.trim()}
    {...props}
  >
    {children}
  </Text>
)

const S2: React.FC<TextProps> = ({
  children,
  size = "text-base",
  fontWeight = "normal",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[24px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const B1: React.FC<TextProps> = ({
  children,
  size = "text-base",
  fontWeight = "normal",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[24px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const B2: React.FC<TextProps> = ({
  children,
  size = "text-sm",
  fontWeight = "normal",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[20px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const C1: React.FC<TextProps> = ({
  children,
  size = "text-xs",
  fontWeight = "normal",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[16px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

const C2: React.FC<TextProps> = ({
  children,
  size = "text-[10px]",
  fontWeight = "normal",
  variant = "primary",
  className = "",
  ...props
}) => (
  <Text
    size={size}
    fontWeight={fontWeight}
    variant={variant}
    className={`leading-[14px] ${className}`}
    {...props}
  >
    {children}
  </Text>
)

export { D1, H1, H2, S1, S2, B1, B2, C1, C2 }
