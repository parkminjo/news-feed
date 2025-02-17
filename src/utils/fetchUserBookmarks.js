import { supabase } from '../services/supabaseClient';

/** 사용자의 북마크 목록 가져오는 함수 */
export const fetchUserBookmarks = async (userId) => {
  if (!userId) return [];

  try {
    const { data, error } = await supabase.from('bookmarks').select('post_id').eq('send_user_id', userId);

    if (error) {
      throw error;
    }

    return data.map((bookmark) => bookmark.post_id); // post_id만 추출
  } catch (error) {
    console.error('북마크 가져오기 오류:', error);
    return [];
  }
};
