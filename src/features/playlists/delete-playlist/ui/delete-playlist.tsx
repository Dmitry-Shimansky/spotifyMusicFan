import {useDeleteMutation} from "../api/use-delete-mutation.ts";

type Props = {
    playlistId: string
}

export const DeletePlaylist = ({playlistId}: Props) => {
    const {mutate} = useDeleteMutation(playlistId);

    const handleDeleteClick = () => {
        mutate();
    }

    return <button onClick={handleDeleteClick}>Delete</button>
}