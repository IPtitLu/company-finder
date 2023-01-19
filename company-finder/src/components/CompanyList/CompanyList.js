import React from "react";

const CompanyList = ({ businessesArray }) => {
    return (
        <div className="w-full flex justify-center items-center mx-auto max-w-screen-xl">
            <div className="flex flex-col w-full">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="inline-block min-w-full sm:px-6">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-slate-400 border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left"
                                        >
                                            Siren
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left"
                                        >
                                            NOM DE L'ENTREPRISE
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left"
                                        >
                                            PDG
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-medium text-white px-6 py-4 text-left"
                                        >
                                            LOCALISATION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {businessesArray.length > 0 ? (
                                        businessesArray.map((item) => (
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.siren !== null ? (
                                                        item.siren
                                                    ) : (
                                                        <p className="text-neutral-400">
                                                            Données privées ou
                                                            indisponibles
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.nom_complet !==
                                                    null ? (
                                                        item.nom_complet
                                                    ) : (
                                                        <p className="text-neutral-400">
                                                            Données privées ou
                                                            indisponibles
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {(() => {
                                                        if (
                                                            item.dirigeants
                                                                .length > 0
                                                        ) {
                                                            if (
                                                                item
                                                                    .dirigeants[0]
                                                                    .nom
                                                            ) {
                                                                return item
                                                                    .dirigeants[0]
                                                                    .nom;
                                                            } else {
                                                                return (
                                                                    <p className="text-neutral-400">
                                                                        Données
                                                                        privées
                                                                        ou
                                                                        indisponibles
                                                                    </p>
                                                                );
                                                            }
                                                        } else {
                                                            return (
                                                                <p className="text-neutral-400">
                                                                    Données
                                                                    privées ou
                                                                    indisponibles
                                                                </p>
                                                            );
                                                        }
                                                    })()}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.siege
                                                        .adresse_complete !==
                                                    null ? (
                                                        item.siege
                                                            .adresse_complete
                                                    ) : (
                                                        <p className="text-neutral-400">
                                                            adresse complète
                                                            privée
                                                        </p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td>
                                                <p>Aucun résultat</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    {businessesArray.length > 0
                        ? businessesArray.map((item) => <p>{item.page}</p>)
                        : null}
                </div>
            </div>
        </div>
    );
};

export default CompanyList;
