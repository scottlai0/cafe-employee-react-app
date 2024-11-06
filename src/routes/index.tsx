import { Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>Cafe-Employee Management Portal</h1>
      <Divider />
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography 
              variant="h6" 
              sx={{ fontWeight: 'bold'}}
            >
              Frontend: Vite + React
            </Typography>
            <ul>
              <li>Routing: Tanstack Router</li>
              <li>State Management: React Query (TanStack Query)</li>
            </ul>
            <Typography 
              variant="h6"
              sx={{ fontWeight: 'bold'}}
            >
              API: FastAPI
            </Typography>
            <Typography 
              variant="h6"
            >
              Database: SQLite
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  ),
})
