export default function BoardPage(props: { params: { boardId: string } }) {
	return <div>{props.params.boardId}</div>;
}
