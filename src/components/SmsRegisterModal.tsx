import React, { useState, useEffect } from 'react';
import { X, Phone, ShieldCheck, User, Sparkles } from 'lucide-react';

interface SmsRegisterModalProps {
  onClose: () => void;
  onRegister: (nickname: string, phone: string) => void;
}

export default function SmsRegisterModal({ onClose, onRegister }: SmsRegisterModalProps) {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone.trim()) {
      setError('请输入手机号码');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入正确的11位手机号码');
      return;
    }

    setError('');
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSentCode(randomCode);
    setCountdown(60);

    // Prompt the user in the preview with the mock SMS verification code
    alert(`【RAIVE HOUSE】您的短信验证码为：${randomCode}。请在5分钟内完成验证绑定。`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname.trim()) {
      setError('请填写您的会员昵称');
      return;
    }
    if (!phone.trim()) {
      setError('请填写手机号码');
      return;
    }
    if (!code.trim()) {
      setError('请填写短信验证码');
      return;
    }
    if (sentCode && code !== sentCode) {
      setError('验证码输入不正确，请重新输入');
      return;
    }

    onRegister(nickname.trim(), phone.trim());
    alert(`注册绑定成功！首杯半价优惠券及100初始积分已派发至您的手机账户 🎁`);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black/85 flex items-center justify-center p-4 z-[99] animate-in fade-in duration-200 select-none">
      <div className="bg-[#111115] border border-neutral-800 rounded-3xl p-5 max-w-[325px] w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          id="close_sms_modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-neutral-850 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 mb-5 select-none">
          <div className="flex justify-center mb-1">
            <span className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Sparkles className="w-5 h-5 fill-amber-500/10" />
            </span>
          </div>
          <span className="text-[9.5px] bg-[#961e1e] text-white font-semibold tracking-wider px-2 py-0.5 rounded uppercase font-mono">
            会员特权绑定
          </span>
          <h4 className="text-sm font-bold text-neutral-100">
            绑定手机号解锁特权
          </h4>
          <p className="text-[10px] text-neutral-450 leading-relaxed max-w-[240px] mx-auto">
            点单结算、存取酒、余额充值及积分兑换需绑定真实手机账户
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {error && (
            <div className="bg-red-950/40 border border-red-900/50 text-red-400 p-2 rounded-xl text-[11px] text-center font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Nickname input */}
          <div className="space-y-1 text-left">
            <label className="text-neutral-400 font-bold text-[11px] block flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-neutral-500" />
              <span>会员专属昵称</span>
            </label>
            <input
              id="sms_nickname_input"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入您的德友昵称"
              required
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none transition-colors"
            />
          </div>

          {/* Phone input */}
          <div className="space-y-1 text-left">
            <label className="text-neutral-400 font-bold text-[11px] block flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>手机号码</span>
            </label>
            <input
              id="sms_phone_input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入11位手机号"
              required
              pattern="^1[3-9]\d{9}$"
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none font-mono transition-colors"
            />
          </div>

          {/* SMS Code Input */}
          <div className="space-y-1 text-left">
            <label className="text-neutral-400 font-bold text-[11px] block flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>短信验证码</span>
            </label>
            <div className="flex gap-2">
              <input
                id="sms_code_input"
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="请输入验证码"
                required
                className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-amber-500 text-neutral-200 px-3 py-2 rounded-xl text-xs outline-none font-mono transition-colors"
              />
              <button
                id="sms_get_code_btn"
                type="button"
                disabled={countdown > 0}
                onClick={handleSendCode}
                className="px-3 py-2 bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-950 text-neutral-200 hover:text-white rounded-xl text-[10px] font-bold border border-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {countdown > 0 ? `${countdown}s 后重新获取` : '获取验证码'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="sms_submit_btn"
            className="w-full py-3 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white font-extrabold text-xs tracking-wider rounded-xl shadow-md cursor-pointer text-center uppercase mt-3 transition-all"
          >
            🔒 同意协议并绑定一键注册
          </button>

          <p className="text-[9.5px] text-neutral-500 text-center leading-relaxed select-none">
            完成注册代表您进入 RAIVE HOUSE 高级会员身份尊享
          </p>
        </form>
      </div>
    </div>
  );
}
