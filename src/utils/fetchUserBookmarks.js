import { supabase } from '../services/supabaseClient';

/** 사용자의 북마크 목록 가져오는 함수 */
export const fetchUserBookmarks = async (userId) => {
  if (!userId) return [];

  try {
    const { data: bookmarkData, error: bookmarkError } = await supabase.from('bookmarks').select('post_id').eq('send_user_id', userId);

    if (bookmarkError) {
      throw bookmarkError;
    }
    if (!bookmarkData || bookmarkData.length === 0) return [];

    const postIds = bookmarkData.map((bookmark) => bookmark.post_id); // post_id만 추출

    const { data: postData, error: postError } = await supabase.from('posts').select('*').in('id', postIds);

    if (postError) {
      throw postError;
    }

    return postData;
  } catch (error) {
    console.error('북마크 가져오기 오류:', error);
    return [];
  }
};
