 const getDate = (date) => {
  const time = new Date(date)
  const finalDate = `${new Date(time)}`
  const formattedDate = finalDate.split(' ').slice(0,4).join(' ')
  return formattedDate
 }

export default getDate