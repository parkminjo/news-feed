import { supabase } from '../../../../services/supabaseClient';

/** 사용자가 북마크를 눌렀는지 확인하는 함수 */
export const fetchBookMarkState = async (userId, postId) => {
  if (!userId || !postId) return false;

  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('send_user_id', userId)
      .eq('post_id', postId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data; // 좋아요가 존재하면 true, 아니면 false 반환
  } catch (error) {
    console.error('북마크 상태 조회 오류:', error);
  }
};
