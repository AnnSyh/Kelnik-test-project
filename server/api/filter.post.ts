export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Имитация задержки сервера
  await new Promise(resolve => setTimeout(resolve, 800))
  
  console.log('Received filter request:', body)
  
  // Здесь будет реальная логика фильтрации на сервере
  // Например, запрос к базе данных
  
  return {
    success: true,
    data: body,
    message: 'Filters applied successfully',
    timestamp: new Date().toISOString()
  }
})