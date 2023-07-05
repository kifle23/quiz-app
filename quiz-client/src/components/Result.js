import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors';

export default function Result() {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions
          .map(x => ({
            ...x,
            ...(res.data.find(y => y.qnId == x.qnId))
          }))
        setQnAnswers(qna)
        calculateScore(qna)

      })
      .catch(err => console.log(err))
  }, [])

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }

  return (
    <>
      <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">
              YOUR SCORE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>/5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + ' mins'}
            </Typography>

          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 220 }}
          image="./result.png"
        />
      </Card>
    </>
  )
}
