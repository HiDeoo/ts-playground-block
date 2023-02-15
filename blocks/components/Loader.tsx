import { Box, Spinner, Text } from '@primer/react'

export function Loader() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        gap: 2,
      }}
    >
      <Spinner size="small" />
      <Text sx={{ fontSize: 1, color: 'neutral.emphasis' }} className="loaderLabel">
        Loading Playground
      </Text>
    </Box>
  )
}
