import { supabase } from '../../../../services/supabaseClient';

export const fetchLikeStatus = async (userId, postId) => {
  if (!userId || !postId) return false;

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('send_user_id', userId)
      .eq('post_id', postId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data; // 좋아요가 존재하면 true, 아니면 false 반환
  } catch (error) {
    console.error('좋아요 상태 조회 오류:', error);
  }
};
