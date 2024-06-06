// Obtenez la date actuelle au format ISO (AAAA-MM-JJ)
const today = new Date().toISOString().split("T")[0];

// Définissez la valeur de l'élément HTML 'start_date' sur la date actuelle
start_date.value = today;

// Définissez la date minimale de 'start_date' sur la date actuelle
start_date.min = today;

// Calculez la date de demain
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

// Convertissez la date de demain en format ISO (AAAA-MM-JJ)
tomorrowFormat = tomorrow.toISOString().split("T")[0];

// Définissez la valeur de l'élément HTML 'end_date' sur la date de demain
end_date.value = tomorrowFormat;

// Définissez la date minimale de 'end_date' sur la date de demain
end_date.min = tomorrowFormat;

// Écoutez les changements de la date de début ('start_date')
start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  // Vérifiez si la date de fin est inférieure à la date de début
  if (end_date.value < start_date.value) {
    // Si oui, augmentez automatiquement la date de fin d'un jour
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

// Empêchez la date de fin ('end_date') de revenir en arrière même si une nouvelle date de début est choisie
end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  // Vérifiez si la date de fin est inférieure à la date de début
  if (end_date.value < start_date.value) {
    // Si oui, déplacez la date de début à la date de fin moins un jour
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
});

// Fonction pour calculer la durée du séjour en jours
const bookingCalcul = () => {
  // Calculez la différence en millisecondes entre la date de fin et la date de début
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );

  // Convertissez la différence en jours
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculez le coût total en multipliant le nombre de jours par le prix par nuit
  total.textContent = diffDays * nightPrice.textContent;
};

// Écoutez les changements de la date de début et de fin pour recalculer le total
start_date.addEventListener("change", bookingCalcul);
end_date.addEventListener("change", bookingCalcul);

// Appelez la fonction de calcul au chargement de la page
bookingCalcul();
