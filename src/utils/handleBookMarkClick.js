import { supabase } from '../services/supabaseClient';

/** 북마크 추가/취소 함수 */
export const handleBookMarkClick = async (e, isLogin, isBookMarkClicked, setIsBookMarkClicked, user, postId) => {
  e.stopPropagation();
  if (!isLogin) return; // 로그인하지 않은 유저 좋아요 기능 비활성화

  // 좋아요 취소
  if (isBookMarkClicked) {
    try {
      const { error } = await supabase.from('bookmarks').delete().eq('send_user_id', user.id).eq('post_id', postId);

      if (error) {
        throw error;
      }

      setIsBookMarkClicked(false);
    } catch (error) {
      console.error(error);
    }
  }

  // 좋아요 추가
  if (!isBookMarkClicked) {
    try {
      const { error } = await supabase.from('bookmarks').insert([{ send_user_id: user.id, post_id: postId }]);

      if (error) {
        throw error;
      }

      setIsBookMarkClicked(true);
    } catch (error) {
      console.error('북마크 처리 오류:', error);
    }
  }
};
