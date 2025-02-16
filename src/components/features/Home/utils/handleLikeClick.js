import { supabase } from '../../../../services/supabaseClient';

/** 좋아요 추가/취소 함수 */
export const handleLikeClick = async (isLogin, isLikeClicked, setIsLikeClicked, user, post) => {
  if (!isLogin) return; // 로그인하지 않은 유저 좋아요 기능 비활성화

  // 좋아요 취소
  if (isLikeClicked) {
    try {
      const { error } = await supabase.from('likes').delete().eq('send_user_id', user.id).eq('post_id', post.id);

      if (error) {
        throw error;
      }

      setIsLikeClicked(false);
    } catch (error) {
      console.error(error);
    }
  }

  // 좋아요 추가
  if (!isLikeClicked) {
    try {
      const { error } = await supabase.from('likes').insert([{ send_user_id: user.id, post_id: post.id }]);

      if (error) {
        throw error;
      }

      setIsLikeClicked(true);
    } catch (error) {
      console.error('좋아요 처리 오류:', error);
    }
  }
};
