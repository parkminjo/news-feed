import { supabase } from '../services/supabaseClient';

/** 북마크 추가/취소 함수 */
export const handleBookMarkClick = async (e, isLogin, isBookMarkClicked, setIsBookMarkClicked, user, postId) => {
  e.stopPropagation();
  if (!isLogin) return alert('[Notification] 북마크를 추가하려면 로그인이 필요합니다.');

  // 북마크 취소
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

  // 북마크 추가
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
