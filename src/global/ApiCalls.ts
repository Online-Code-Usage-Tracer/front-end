import axios from "axios";
// {1: [{x: '22', y: '10.5'}, {x: '23', y: '11.5'}, ], 2: ...}
const customAxios = axios.create(
    {
        baseURL: 'http://localhost:8000',
        timeout: 5000
    }
);

export const axiosStart = (url: string, datasetName: string) =>
    customAxios.get(`start/?url=${url}/datasetName=${datasetName}`)

// export const axiosWeekInf = () => customAxios.get('week_info')
//
// export const axiosFantasyTeam = () => customAxios.get('fantasyteam')
//
// export const axiosDeletePlayer = (transfersPlayers: myPlayersType, transfersSelectedPosition: number) => customAxios.delete(`fantasyteam/player/${transfersPlayers[transfersSelectedPosition].id}`, {
//         data: {
//             playerId: transfersPlayers[transfersSelectedPosition].id
//         }
//     }
// )
//
// export const axiosPlayersList = (search: searchType) => customAxios.get('player_list', {
//     params: {
//         search: search.search,
//         position: search.position,
//         player_total_points_sort: search.pointsSort,
//         player_cost_sort: search.costsSort,
//         page_no: search.pageNumber,
//         list_size: search.listSize
//     }
// })
//
// export const axiosAddPlayer = (player: playerType, position: number) => customAxios.post('fantasyteam/player', {
//     playerId: player.id,
//     locationInTransferUI: position
// })
//
// export const axiosSignUp = (Username: string, Password: string, First_name: string, Last_name: string, Email: string, Country: string, date: string) => customAxios.post('signup',
//     {
//         username: Username,
//         password: Password,
//         firstName: First_name,
//         lastName: Last_name,
//         email: Email,
//         country: Country,
//         birthDate: date
//     }
// )
//
// export const axiosSignUpConfirm = (token: string, code: string) => customAxios.post('verification', {
//         verificationCode: code
//     }
// )
//
// export const axiosSignIn = (username: string, password: string) => customAxios.post('login', {
//         username: username,
//         password: password
//     }
// )
//
// export const axiosAllUsersList = (searchText: string) => customAxios.get('user_search', {
//     params: {
//         search: searchText,
//         search_type: "All"
//     }
// })
//
// export const axiosFollow = (id: any) => customAxios.post('follow', {
//
//     followUserId: id
//
// })
// export const axiosUnfollow = (id: String) =>
//     customAxios.delete(`follow/${id}`)
//
// export const axiosFollowingSearch = (searchText: string) => customAxios.get('user_search', {
//     params: {
//         search: searchText,
//         search_type: "Following"
//     }
// })
//
// export const axiosFollowerSearch = (searchText: string) => customAxios.get('user_search', {
//     params: {
//         search: searchText,
//         search_type: "Follower"
//     }
// })
// export const axiosSignInWithToken = () => customAxios.get('login_with_token')
//
// export const axiosSubstitution = (playerOutId: number, playerInId: number) => customAxios.post('substitution', {
//     playerOutId: playerOutId,
//     playerInId: playerInId
// })
//
// export const axiosUserInfo = (id: string) => customAxios.get('user_info',
//     {
//         params: {
//             user_id: id
//         }
//     }
// )
//
// export const axiosEventList = () => customAxios.get('event_list')
//
// export const axiosLike = (eventId: string) => customAxios.post('like', {
//     eventId: eventId
// })
//
// export const axiosUnlike = (eventId: string) => customAxios.delete(`like/${eventId}`)
//
// export const axiosGetProfile = () => customAxios.get('profile')
//
// export const axiosGetProfileImageUrl = (imageUrl: string) => `${customAxios.getUri()}/profile/image/${imageUrl}`
//
// export const axiosUpdateProfile = (profile: profileApiCallType) => customAxios.post('profile', {
//     profileImage: profile.profileImage,
//     firstName: profile.firstName,
//     lastName: profile.lastName,
//     country: profile.country,
//     password: profile.password
// })