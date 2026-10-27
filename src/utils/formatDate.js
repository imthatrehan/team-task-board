export default function formatDate(createdAt){
    const date = new Date(createdAt)
    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`
    return formattedDate
}