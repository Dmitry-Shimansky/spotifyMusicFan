import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {client} from "../shared/api/client.ts";
import {Pagination} from "../shared/ui/pagination/pagination.tsx";
import {type ChangeEvent, useState} from "react";

export const Playlists = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const query = useQuery({
        queryKey: ['playlists', {page, search}],
        queryFn: async ({signal}) => {
            const response = await client.GET('/playlists', {
                params: {
                    query: {
                        pageNumber: page,
                        search
                    }
                },
                signal
            })
            // const response = await client.GET('/playlistsXXX' as unknown as '/playlists')
            if (response.error) {
                throw (response as unknown as {error: Error}).error;
            }
            return response.data;
        },
        placeholderData: keepPreviousData
    })

    console.log('status:' + query.status)
    console.log('fetchStatus:' + query.fetchStatus)

    if (query.isPending) return <span>Loading...</span>
    if (query.isError) return <span>{JSON.stringify(query.error.message)}</span>

    return (
        <div>
            <div>
                <input
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
                    placeholder={"search..."}
                />
            </div>
            <hr />
            {/*{query.isFetching ? 'loading...' : ''}*/}
            <Pagination current={page}
                        pagesCount={query.data.meta.pagesCount}
                        changePageNumber={setPage}
                        isFetching={query.isFetching} />
            <ul>
                {query.data.data.map((playlist) => (
                    <li key={playlist.id}>
                        {playlist.attributes.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}