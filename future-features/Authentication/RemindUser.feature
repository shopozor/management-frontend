#language: fr

@common @login @service-worker @toBeClarified
Fonctionnalité: Se souvenir de l'utilisateur

  *En tant qu'utilisateur,
  je veux pouvoir demander au Shopozor de se souvenir de moi,
  de telle sorte que je n'aie pas besoin de m'identifier à chaque fois que je veux y accéder.*

  Si l'utilisateur ne demande pas au Shopozor de se souvenir de lui,
  alors sa session n'est pas rafraîchie par l'application client
  et il est déconnecté automatiquement au prochain rafraîchissement. 
  L'intervalle de rafraîchissement est défini par le serveur. L'application client 
  se calque sur le serveur pour effectuer le rafraîchissement quand c'est nécessaire.  

  Si l'utilisateur demande au Shopozor de se souvenir de lui, 
  alors l'application client rafraîchit automatiquement sa session 
  et il reste identifié jusqu'à l'expiration de celle-ci.
  Le rafraîchissement ne peut se faire que si le token d'identification est stocké 
  dans un cookie dans l'application client. C'est pourquoi l'utilisation des 
  cookies est requise.

  # Etudier les service workers pour voir ce qui est possible 
  # Que peut faire un service worker dans le cas où l'application est fermée ?
  # Est-ce qu'il est possible de détecter le démarrage de l'application et 
  # d'imposer un refresh à ce moment-là ? 

  Scénario: L'utilisateur veut que le Shopozor se souvienne de lui
    Etant donné un utilisateur qui a demandé au Shopozor de se souvenir de lui
    Et qui s'est identifié avec un e-mail et un mot de passe valides 
    Lorsque 1 mois passe
    Alors sa session est rafraîchie 

  Scénario: L'utilisateur ne veut pas que le Shopozor se souvienne de lui
    Etant donné un utilisateur qui a demandé au Shopozor de ne pas se souvenir de lui
    Et qui s'est identifié avec un e-mail et un mot de passe valides
    Lorsque 1 mois passe
    Alors sa session se ferme automatiquement