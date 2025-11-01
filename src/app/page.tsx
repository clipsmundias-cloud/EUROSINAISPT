'use client'

import { useState, useEffect } from 'react'
import { Star, Shield, Clock, Users, TrendingUp, MessageCircle, CheckCircle, Trophy, Zap, Target } from 'lucide-react'

export default function CasinoSignalsLanding() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 })
  const [spotsLeft, setSpotsLeft] = useState(8)
  const [isGameActive, setIsGameActive] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [coins, setCoins] = useState(0)
  const [showFloatingElements, setShowFloatingElements] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleGameCTA = () => {
    if (clickCount < 3) {
      setIsGameActive(true)
      setClickCount(prev => prev + 1)
      setCoins(prev => prev + 100)
      setShowFloatingElements(true)
      
      setTimeout(() => {
        setShowFloatingElements(false)
      }, 1000)

      if (clickCount === 2) {
        // Após 3 cliques, redireciona para o WhatsApp
        setTimeout(() => {
          window.open('https://wa.me/seu_numero_whatsapp', '_blank')
        }, 1500)
      }
    }
  }

  const getButtonText = () => {
    switch (clickCount) {
      case 0: return "🎰 DESBLOQUEAR ACESSO VIP"
      case 1: return "🔓 QUASE LÁ... CONTINUE!"
      case 2: return "💎 ÚLTIMO CLIQUE PARA VIP!"
      default: return "✨ REDIRECIONANDO..."
    }
  }

  const getButtonIcon = () => {
    switch (clickCount) {
      case 0: return "🎲"
      case 1: return "🎯"
      case 2: return "🏆"
      default: return "✨"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden relative">
      {/* Floating Elements */}
      {showFloatingElements && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            >
              <span className="text-2xl">💰</span>
            </div>
          ))}
        </div>
      )}

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #ffd700 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #ff6b35 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              VIP Signals PT
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span>100% Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span>+900 Membros</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">ACESSO LIMITADO • APENAS HOJE</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Recebe Sinais VIP de Casino
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              100% Gratuito e Exclusivo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Sem custos, sem vendas, acesso limitado por convite.
            <span className="block text-yellow-400 font-semibold mt-2">
              Só para os primeiros {spotsLeft} convites do dia.
            </span>
          </p>

          {/* Game CTA Button */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="bg-gray-700 rounded-full h-3 w-80 mx-auto overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${(clickCount / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Progresso: {clickCount}/3 cliques para desbloquear
                </p>
              </div>

              {/* Coins Display */}
              {coins > 0 && (
                <div className="mb-4 flex items-center justify-center space-x-2">
                  <span className="text-2xl">🪙</span>
                  <span className="text-xl font-bold text-yellow-400">{coins} moedas</span>
                </div>
              )}

              <button
                onClick={handleGameCTA}
                disabled={clickCount >= 3}
                className={`
                  group relative px-8 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform
                  ${isGameActive ? 'animate-pulse scale-105' : 'hover:scale-105'}
                  ${clickCount >= 3 
                    ? 'bg-green-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 shadow-2xl hover:shadow-yellow-500/25'
                  }
                  border-2 border-yellow-400/50 hover:border-yellow-400
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-2xl ${isGameActive ? 'animate-spin' : ''}`}>
                    {getButtonIcon()}
                  </span>
                  <span>{getButtonText()}</span>
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </button>

              {/* Floating Badges */}
              {clickCount > 0 && (
                <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-bounce">
                  {clickCount}
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-8">
            ⏰ O acesso poderá fechar a qualquer momento
          </p>
        </div>
      </section>

      {/* Urgency Counter */}
      <section className="relative z-10 py-8 px-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border-y border-red-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-red-400">⚡ Vagas Limitadas ⚡</h3>
          <div className="flex justify-center items-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-400">Horas</div>
            </div>
            <div className="text-2xl text-red-400">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-400">Minutos</div>
            </div>
            <div className="text-2xl text-red-400">:</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-sm text-gray-400">Segundos</div>
            </div>
          </div>
          <div className="bg-red-900/50 rounded-full h-4 max-w-md mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full" style={{ width: `${(spotsLeft / 10) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-300 mt-2">Restam apenas <span className="text-red-400 font-bold">{spotsLeft} vagas</span> disponíveis</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Porquê Escolher os Nossos Sinais VIP?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: "99% de Assertividade", desc: "Sinais testados e comprovados" },
              { icon: Zap, title: "Tempo Real", desc: "Recebe alertas instantâneos" },
              { icon: Shield, title: "Sem Custos", desc: "100% gratuito, sem compromissos" },
              { icon: Target, title: "Foco em Portugal", desc: "Especializado no mercado português" }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section with Real Images */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O Que Dizem os Nossos Membros
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 - WhatsApp Success */}
            <div className="bg-gradient-to-br from-green-900/30 to-gray-900/50 p-6 rounded-2xl border border-green-500/30">
              <div className="flex items-center mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/ce73e2f5-f647-49dc-bab7-7c01f4046405.jpg" 
                  alt="Conversa de sucesso no WhatsApp"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Incrível! Os sinais funcionam mesmo. Já consegui recuperar o que perdi e ainda lucrar. Obrigado pela ajuda!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Miguel R.</p>
                  <p className="text-sm text-gray-400">Lisboa</p>
                </div>
              </div>
            </div>

            {/* Review 2 - Banking App */}
            <div className="bg-gradient-to-br from-blue-900/30 to-gray-900/50 p-6 rounded-2xl border border-blue-500/30">
              <div className="flex items-center mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/cca78c09-51b8-43ae-a22f-2fc3c313276c.jpg" 
                  alt="Saldo bancário positivo"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Finalmente consegui ter lucros consistentes! O meu saldo nunca esteve tão positivo. Recomendo a todos!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Ana S.</p>
                  <p className="text-sm text-gray-400">Porto</p>
                </div>
              </div>
            </div>

            {/* Review 3 - Money Success */}
            <div className="bg-gradient-to-br from-yellow-900/30 to-gray-900/50 p-6 rounded-2xl border border-yellow-500/30">
              <div className="flex items-center mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8c03cd71-2f4c-4f26-a228-af83238e5e88.jpg" 
                  alt="Dinheiro ganho com sinais"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Não acreditava que fosse possível, mas os sinais realmente funcionam! Já consegui ganhos significativos."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-semibold">João P.</p>
                  <p className="text-sm text-gray-400">Coimbra</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Chat-style Review */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-green-400 font-semibold">Conversa Recente</span>
              </div>
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/0366d907-de75-4a55-9e97-c350e9fd9920.jpg" 
                alt="Conversa sobre ganhos"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 italic">
                "Os sinais chegam sempre a tempo e são muito precisos. Já consegui recuperar tudo o que tinha perdido antes e ainda estou no lucro!"
              </p>
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-sm">Ricardo M.</p>
                  <p className="text-xs text-gray-400">Membro VIP há 2 meses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">900+</div>
              <div className="text-gray-400">Membros Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99%</div>
              <div className="text-gray-400">Taxa de Sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-400">Suporte</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400">Gratuito</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-t border-yellow-500/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Não Percas Esta Oportunidade Única
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            100% gratuito. Acesso limitado. Exclusivo para Portugal.<br />
            <span className="text-yellow-400 font-semibold">
              Não vendemos nada — apenas ajudamos quem quer jogar com vantagem.
            </span>
          </p>
          
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-8 border border-red-500/30 mb-8">
            <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ ATENÇÃO ⚠️</h3>
            <p className="text-lg text-gray-300">
              Esta oferta é limitada e pode ser retirada a qualquer momento.<br />
              <span className="text-yellow-400 font-semibold">
                Garante já o teu lugar antes que seja tarde demais!
              </span>
            </p>
          </div>

          <button
            onClick={() => window.open('https://wa.me/seu_numero_whatsapp', '_blank')}
            className="group relative px-12 py-6 text-2xl font-bold rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-400 hover:via-emerald-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25 border-2 border-green-400/50 hover:border-green-400"
          >
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8" />
              <span>FALAR NO WHATSAPP AGORA</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-600/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Clica para falar diretamente connosco no WhatsApp
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              VIP Signals PT
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 VIP Signals PT. Todos os direitos reservados.<br />
            Jogo responsável. Apenas para maiores de 18 anos.
          </p>
        </div>
      </footer>
    </div>
  )
}